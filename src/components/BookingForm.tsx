import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    carClass: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Booking data:', formData);
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
  };

  return (
    <Card id="booking-form" className="w-full max-w-md glass-effect border-white/20">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Забронировать поездку</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="from" className="text-white/90">Откуда</Label>
            <Input
              id="from"
              value={formData.from}
              onChange={(e) => setFormData({ ...formData, from: e.target.value })}
              placeholder="Адрес отправления"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              required
            />
          </div>

          <div>
            <Label htmlFor="to" className="text-white/90">Куда</Label>
            <Input
              id="to"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              placeholder="Адрес назначения"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="date" className="text-white/90">Дата</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="time" className="text-white/90">Время</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-white/90">Класс автомобиля</Label>
            <Select value={formData.carClass} onValueChange={(value) => setFormData({ ...formData, carClass: value })}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Выберите класс" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Эконом</SelectItem>
                <SelectItem value="comfort">Комфорт</SelectItem>
                <SelectItem value="business">Бизнес</SelectItem>
                <SelectItem value="minivan">Минивэн</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" variant="secondary" size="lg" className="w-full font-semibold">
            Оформить заказ
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;