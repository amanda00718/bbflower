import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ShoppingCart, Flower, MapPin, User, Phone, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const flowerOptions = [
  { value: 'rose', label: '玫瑰花束', price: 1280, description: '12朵紅玫瑰配尤加利葉' },
  { value: 'lavender', label: '薰衣草花束', price: 980, description: '天然薰衣草配滿天星' },
  { value: 'sunflower', label: '向日葵花束', price: 880, description: '5朵向日葵配綠葉襯托' },
  { value: 'lily', label: '百合花束', price: 1580, description: '6朵白百合配尤加利葉' },
  { value: 'mixed', label: '季節混合花束', price: 1180, description: '設計師精選當季花材' }
];

export const FlowerOrder: React.FC = () => {
  const [selectedFlower, setSelectedFlower] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    message: '',
    deliveryDate: '',
    deliveryTime: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!selectedFlower || !formData.name || !formData.phone || !formData.address) {
      toast({
        title: "請填寫必要資訊",
        description: "請確保已選擇花束並填寫姓名、電話和地址",
        variant: "destructive"
      });
      return;
    }

    const selectedFlowerData = flowerOptions.find(f => f.value === selectedFlower);
    
    toast({
      title: "訂購資料試填完成 🌸",
      description: `您選擇了${selectedFlowerData?.label}。此表單目前為試填，資料未送出。`,
    });

    // Reset form
    setSelectedFlower('');
    setFormData({
      name: '',
      phone: '',
      address: '',
      message: '',
      deliveryDate: '',
      deliveryTime: ''
    });
  };

  const selectedFlowerData = flowerOptions.find(f => f.value === selectedFlower);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            快速訂購您的花朵
          </h2>
          <p className="text-muted-foreground">
            專業花藝師精心製作，當日新鮮配送到府
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 花束選擇 */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flower className="w-5 h-5 text-primary" />
                選擇花束
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {flowerOptions.map((flower) => (
                <div
                  key={flower.value}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedFlower === flower.value
                      ? 'border-primary bg-primary/5 shadow-soft'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedFlower(flower.value)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-foreground">{flower.label}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{flower.description}</p>
                    </div>
                    <span className="text-lg font-bold text-primary">NT$ {flower.price}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 訂購資訊 */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                配送資訊
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  收件人姓名 *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="請輸入收件人姓名"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  聯絡電話 *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="請輸入聯絡電話"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  配送地址 *
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="請輸入詳細配送地址"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">配送日期</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">配送時段</Label>
                  <Select value={formData.deliveryTime} onValueChange={(value) => handleInputChange('deliveryTime', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="選擇時段" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">上午 (9:00-12:00)</SelectItem>
                      <SelectItem value="afternoon">下午 (13:00-17:00)</SelectItem>
                      <SelectItem value="evening">晚上 (18:00-21:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  特殊需求
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="如有特殊需求或想對收件人說的話，請在此留言..."
                  rows={3}
                />
              </div>

              {selectedFlowerData && (
                <div className="bg-gradient-soft p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">總計金額</span>
                    <span className="text-xl font-bold text-primary">
                      NT$ {selectedFlowerData.price}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    包含精美包裝與配送服務
                  </p>
                </div>
              )}

              <Button 
                variant="flower" 
                className="w-full"
                onClick={handleSubmit}
                disabled={!selectedFlower}
              >
                確認訂購
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};