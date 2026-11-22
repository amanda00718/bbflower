import { readFile, writeFile } from 'node:fs/promises';

const htmlPath = new URL('./dist/index.html', import.meta.url);
let html = await readFile(htmlPath, 'utf8');
const scriptTag = html.match(/<script type="module"[^>]* src="([^"]+)"><\/script>/);
const styleTag = html.match(/<link rel="stylesheet"[^>]* href="([^"]+)">/);
if (!scriptTag || !styleTag) throw new Error('Expected one script and stylesheet.');
const [script, style] = await Promise.all(
  [scriptTag, styleTag].map(tag => readFile(new URL(tag[1], htmlPath), 'utf8'))
);
html = html.replace(scriptTag[0], () => `<script type="module">${script.replace(/<\/script/gi, '<\\/script')}</script>`);
html = html.replace(styleTag[0], () => `<style>${style}</style>`);
await writeFile(htmlPath, html);
