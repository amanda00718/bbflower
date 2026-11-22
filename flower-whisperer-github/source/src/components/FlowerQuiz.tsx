import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Flower, Heart, Sun, Moon, Sparkles } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    value: string;
    icon: React.ReactNode;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "在一個安靜的午後，你最想做什麼？",
    options: [
      { text: "閱讀一本好書", value: "rose", icon: <Heart className="w-5 h-5" /> },
      { text: "在花園裡漫步", value: "lavender", icon: <Flower className="w-5 h-5" /> },
      { text: "與朋友聊天", value: "sunflower", icon: <Sun className="w-5 h-5" /> },
      { text: "獨自思考人生", value: "lily", icon: <Moon className="w-5 h-5" /> }
    ]
  },
  {
    id: 2,
    question: "你認為最美麗的瞬間是什麼？",
    options: [
      { text: "日出的第一道曙光", value: "sunflower", icon: <Sun className="w-5 h-5" /> },
      { text: "雨後的彩虹", value: "rose", icon: <Sparkles className="w-5 h-5" /> },
      { text: "夜晚的星空", value: "lily", icon: <Moon className="w-5 h-5" /> },
      { text: "花瓣飄落的瞬間", value: "lavender", icon: <Flower className="w-5 h-5" /> }
    ]
  },
  {
    id: 3,
    question: "當你感到壓力時，你會選擇什麼方式放鬆？",
    options: [
      { text: "聽輕柔的音樂", value: "lavender", icon: <Heart className="w-5 h-5" /> },
      { text: "運動流汗", value: "sunflower", icon: <Sun className="w-5 h-5" /> },
      { text: "冥想靜心", value: "lily", icon: <Moon className="w-5 h-5" /> },
      { text: "找朋友傾訴", value: "rose", icon: <Sparkles className="w-5 h-5" /> }
    ]
  }
];

const flowerResults = {
  rose: {
    name: "玫瑰",
    meaning: "熱情與愛",
    description: "你是一個充滿愛與熱情的人，重視人際關係，善於表達情感。玫瑰代表你內心深處的溫暖與真誠。",
    color: "text-red-500",
    bg: "bg-gradient-to-br from-red-100 to-pink-100"
  },
  lavender: {
    name: "薰衣草",
    meaning: "寧靜與平和",
    description: "你擁有一顆平靜的心，善於在喧囂中找到寧靜。薰衣草象徵你內在的智慧與平和的氣質。",
    color: "text-purple-500",
    bg: "bg-gradient-to-br from-purple-100 to-blue-100"
  },
  sunflower: {
    name: "向日葵",
    meaning: "陽光與活力",
    description: "你如陽光般溫暖明亮，總是能帶給周圍的人正能量。向日葵代表你樂觀積極的人生態度。",
    color: "text-yellow-500",
    bg: "bg-gradient-to-br from-yellow-100 to-orange-100"
  },
  lily: {
    name: "百合",
    meaning: "純潔與高雅",
    description: "你擁有高雅的氣質和純潔的心靈，喜歡深度思考，追求精神層面的美好。百合象徵你的優雅與智慧。",
    color: "text-white",
    bg: "bg-gradient-to-br from-gray-100 to-blue-50"
  }
};

interface FlowerQuizProps {
  onComplete: (result: string) => void;
}

export const FlowerQuiz: React.FC<FlowerQuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const counts: { [key: string]: number } = {};
      newAnswers.forEach(answer => {
        counts[answer] = (counts[answer] || 0) + 1;
      });
      
      const topResult = Object.keys(counts).reduce((a, b) => 
        counts[a] > counts[b] ? a : b
      );
      
      setResult(topResult);
      setIsComplete(true);
      onComplete(topResult);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsComplete(false);
    setResult('');
  };

  if (isComplete && result) {
    const flowerResult = flowerResults[result as keyof typeof flowerResults];
    
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-medium">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            你的花朵是：{flowerResult.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`p-6 rounded-lg ${flowerResult.bg}`}>
            <div className="text-center space-y-4">
              <div className="text-6xl">🌸</div>
              <h3 className={`text-xl font-semibold ${flowerResult.color}`}>
                {flowerResult.meaning}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {flowerResult.description}
              </p>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              🎁 恭喜完成測驗！您獲得了專屬的花朵祝福
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="flower" onClick={restartQuiz}>
                重新測驗
              </Button>
              <Button variant="secondary">
                查看花朵推薦
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium animate-fade-in">
      <CardHeader>
        <div className="space-y-4">
          <CardTitle className="text-xl font-semibold text-center">
            花朵心理測驗
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>問題 {currentQuestion + 1}</span>
              <span>{questions.length} 題</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-6">
            {questions[currentQuestion].question}
          </h3>
          
          <div className="grid gap-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="soft"
                className="justify-start h-auto p-4 text-left hover:shadow-soft transition-bounce"
                onClick={() => handleAnswer(option.value)}
              >
                <div className="flex items-center gap-3">
                  {option.icon}
                  <span>{option.text}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};