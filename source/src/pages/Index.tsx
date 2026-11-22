import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FlowerQuiz } from '@/components/FlowerQuiz';
import { FlowerChat } from '@/components/FlowerChat';
import { CustomerStories } from '@/components/CustomerStories';
import { FlowerOrder } from '@/components/FlowerOrder';
import { Flower2, Sparkles, Heart, MessageCircle, ShoppingBag, TestTube2 } from 'lucide-react';
import heroImage from '@/assets/hero-flowers.jpg';

const Index = () => {
  const [activeSection, setActiveSection] = useState<'quiz' | 'chat' | 'stories' | 'order'>('quiz');
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleQuizComplete = (result: string) => {
    setQuizCompleted(true);
  };

  const scrollToSection = (section: 'quiz' | 'chat' | 'stories' | 'order') => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="animate-fade-in">
            <div className="mb-6">
              <Flower2 className="w-20 h-20 text-primary mx-auto mb-4 animate-float" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
              故事換花
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 leading-relaxed">
              透過心理測驗發現您的專屬花朵
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              每一朵花都有它的故事，每一個人都有屬於自己的花朵。
              讓 AI 花朵顧問為您找到最適合的花朵，開啟美好的花朵之旅。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="flower" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => scrollToSection('quiz')}
              >
                <TestTube2 className="w-5 h-5 mr-2" />
                開始花朵測驗
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => scrollToSection('chat')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                AI 花朵顧問
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating petals animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-petal-fall opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            >
              🌸
            </div>
          ))}
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              您的花朵之旅
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              四個步驟，找到最適合您的花朵
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300 group cursor-pointer"
                  onClick={() => scrollToSection('quiz')}>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <TestTube2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">心理測驗</h3>
                <p className="text-muted-foreground text-sm">
                  透過精心設計的問題，了解您的內在特質
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300 group cursor-pointer"
                  onClick={() => scrollToSection('chat')}>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">AI 顧問</h3>
                <p className="text-muted-foreground text-sm">
                  與專業 AI 花朵顧問對話，獲得個人化建議
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300 group cursor-pointer"
                  onClick={() => scrollToSection('stories')}>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">客戶故事</h3>
                <p className="text-muted-foreground text-sm">
                  閱讀其他人的花朵故事，建立信任與共鳴
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300 group cursor-pointer"
                  onClick={() => scrollToSection('order')}>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">快速訂購</h3>
                <p className="text-muted-foreground text-sm">
                  簡單幾步完成訂購，新鮮花朵送到府
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Flower Quiz Section */}
      <section id="quiz" className="py-16 bg-gradient-soft">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              發現您的專屬花朵
            </h2>
            <p className="text-muted-foreground">
              每做一次測驗，就會有屬於您的小禮物 🎁
            </p>
          </div>
          <FlowerQuiz onComplete={handleQuizComplete} />
        </div>
      </section>

      {/* AI Chat Section */}
      <section id="chat" className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              AI 花朵顧問
            </h2>
            <p className="text-muted-foreground">
              與 AI 討論，找出最適合您的花朵
            </p>
          </div>
          <FlowerChat />
        </div>
      </section>

      {/* Customer Stories */}
      <section id="stories">
        <CustomerStories />
      </section>

      {/* Flower Order */}
      <section id="order">
        <FlowerOrder />
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flower2 className="w-8 h-8" />
            <span className="text-2xl font-bold">故事換花</span>
          </div>
          <p className="text-background/80 mb-6">
            每一朵花都有它的故事，每一個故事都值得被珍藏
          </p>
          <div className="flex items-center justify-center gap-2 text-background/60">
            <Sparkles className="w-4 h-4" />
            <span>用心製作 • 用愛傳遞</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;