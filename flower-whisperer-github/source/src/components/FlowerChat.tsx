import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Flower2 } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const aiResponses = [
  "根據您的喜好，我推薦您嘗試薰衣草，它能帶來內心的平靜與安寧。",
  "玫瑰是愛情的象徵，如果您想表達溫暖的情感，玫瑰會是完美的選擇。",
  "向日葵代表積極向上的能量，很適合需要鼓勵和正能量的時刻。",
  "百合花象徵純潔與高雅，非常適合重要的儀式或紀念日。",
  "鬱金香代表完美的愛，是春天最美麗的使者。",
  "康乃馨傳達著深深的愛意和感謝，特別適合表達對母親的愛。"
];

export const FlowerChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: '您好！我是花朵顧問小花🌸 很高興為您服務！請告訴我您的心情或想要表達的情感，我將為您推薦最適合的花朵。',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const endpoint = document.querySelector<HTMLMetaElement>('meta[name="flower-ai-endpoint"]')?.content.trim();

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    let reply: string;
    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMessage].slice(-9).map(message => ({
              role: message.type === 'ai' ? 'assistant' : 'user',
              content: message.content
            }))
          }),
          signal: AbortSignal.timeout(20000)
        });
        if (!response.ok) throw new Error('Flower advisor request failed');
        const data = await response.json();
        if (typeof data.reply !== 'string' || !data.reply.trim()) throw new Error('Empty reply');
        reply = data.reply;
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
        reply = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      }
    } catch {
      reply = '花朵顧問暫時連線失敗，請稍後再試一次。';
    }

    setMessages(prev => [...prev, {
      id: userMessage.id + 1,
      type: 'ai',
      content: reply,
      timestamp: new Date()
    }]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium h-[600px] flex flex-col">
      <CardHeader className="bg-gradient-secondary rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-secondary-foreground">
          <Flower2 className="w-6 h-6" />
          AI 花朵顧問
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'ai' && (
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString('zh-TW', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              
              {message.type === 'user' && (
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-soft">
                  <User className="w-4 h-4 text-accent-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Input */}
        <div className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              maxLength={1000}
              placeholder="告訴我您的心情或需求..."
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              variant="flower"
              size="icon"
              disabled={!inputValue.trim() || isTyping}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};