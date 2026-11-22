import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, Heart } from 'lucide-react';

const stories = [
  {
    id: 1,
    name: "小雨",
    flower: "薰衣草",
    story: "透過花朵測驗，我發現自己原來是一個追求寧靜的人。收到薰衣草花束的那一刻，我真的感受到了內心的平靜。感謝這個神奇的體驗！",
    rating: 5,
    date: "2024年1月"
  },
  {
    id: 2,
    name: "Alex",
    flower: "向日葵",
    story: "我本來不太相信這種心理測驗，但結果真的很準確！向日葵確實代表了我陽光的個性。現在我的辦公桌上總是擺著一束向日葵，每天都充滿正能量。",
    rating: 5,
    date: "2024年2月"
  },
  {
    id: 3,
    name: "梅子",
    flower: "玫瑰",
    story: "在我最低潮的時候找到了這個網站，測驗結果是玫瑰 - 代表愛與溫暖。那束紅玫瑰不只美麗，更讓我重新找回了愛自己的勇氣。謝謝你們的用心！",
    rating: 5,
    date: "2024年2月"
  },
  {
    id: 4,
    name: "志明",
    flower: "百合",
    story: "原來我是百合性格！測驗幫我更了解自己追求純淨美好事物的特質。現在我每週都會買一束百合回家，生活品質真的提升了很多。",
    rating: 4,
    date: "2024年3月"
  }
];

export const CustomerStories: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-soft">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            客戶的花朵故事
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            每一朵花都有屬於它的故事，每一個人都有專屬的花朵。
            聽聽其他人與花朵相遇的美好時刻。
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <Card key={story.id} className="shadow-soft hover:shadow-medium transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">{story.name}</h4>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-primary font-medium">{story.flower}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < story.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">{story.date}</span>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {story.story}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-primary">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-medium">已有 1,200+ 位朋友找到了專屬花朵</span>
          </div>
        </div>
      </div>
    </section>
  );
};