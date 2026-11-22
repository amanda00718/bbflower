const instructions = '你是「故事換花」的花藝顧問小花。用台灣繁體中文自然回覆。根據對方的情緒、送禮對象、場合或故事，推薦最多三種花材，說明花語並給一個花束配色建議。資訊不足時問一個簡短問題。不要承諾商品庫存、價格、下單或配送。不要要求個資。';

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    if (!origin || origin !== env.SITE_ORIGIN) return new Response(null, { status: 403 });

    const headers = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'no-store',
      'Vary': 'Origin'
    };
    const respond = (data, status) => Response.json(data, { status, headers });

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (request.method !== 'POST') return respond({ error: 'Method not allowed' }, 405);
    if (!env.OPENAI_API_KEY || !env.CHAT_LIMIT) return respond({ error: 'AI not configured' }, 503);

    try {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      if (!(await env.CHAT_LIMIT.limit({ key: ip })).success) return respond({ error: 'Rate limit exceeded' }, 429);
      if (Number(request.headers.get('Content-Length')) > 32000) return respond({ error: 'Request too large' }, 413);
      const body = await request.text();
      if (body.length > 12000) return respond({ error: 'Request too large' }, 413);
      let payload;
      try { payload = JSON.parse(body); } catch { return respond({ error: 'Invalid JSON' }, 400); }
      const messages = payload?.messages;
      if (!Array.isArray(messages) || messages.length > 9 || messages.at(-1)?.role !== 'user' ||
          messages.some(m => !m || !['user', 'assistant'].includes(m.role) ||
            typeof m.content !== 'string' || !m.content.trim() || m.content.length > 2000)) {
        return respond({ error: 'Invalid messages' }, 400);
      }

      const upstream = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: env.OPENAI_MODEL || 'gpt-4.1-mini',
          instructions,
          input: messages.map(({role, content}) => ({role, content})),
          max_output_tokens: 400,
          store: false
        }),
        signal: AbortSignal.timeout(15000)
      });
      if (!upstream.ok) return respond({ error: 'AI temporarily unavailable' }, 502);
      const data = await upstream.json();
      const reply = (data.output || []).flatMap(item => item.content || [])
        .filter(part => part.type === 'output_text').map(part => part.text).join('\n').trim();
      return reply ? respond({ reply }, 200) : respond({ error: 'Empty reply' }, 502);
    } catch {
      return respond({ error: 'AI temporarily unavailable' }, 502);
    }
  }
};
