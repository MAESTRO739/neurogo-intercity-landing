import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: 'Елена Морозова',
      rating: 5,
      text: 'Великолепный сервис! Водитель приехал точно в назначенное время, машина чистая и комфортная. В аэропорт добрались без опозданий.',
      route: 'Москва → Домодедово'
    },
    {
      name: 'Андрей Петров',
      rating: 5,
      text: 'Заказывал поездку в Тулу на важную встречу. Очень доволен качеством обслуживания и профессионализмом водителя.',
      route: 'Москва → Тула'
    },
    {
      name: 'Мария Иванова',
      rating: 5,
      text: 'Отличная компания! Пользуюсь их услугами уже полгода для поездок на дачу. Всегда вовремя, всегда чисто.',
      route: 'Москва → Калужская область'
    },
    {
      name: 'Дмитрий Козлов',
      rating: 5,
      text: 'Заказывал минивэн для семьи из 6 человек. Просторно, удобно, водитель помог с багажом. Рекомендую!',
      route: 'Москва → Шереметьево'
    },
    {
      name: 'Ольга Сидорова',
      rating: 5,
      text: 'Быстро, надёжно, по адекватной цене. Особенно понравилось, что можно заказать детское кресло. Спасибо!',
      route: 'Домодедово → Москва'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Отзывы <span className="gradient-primary bg-clip-text text-transparent">наших клиентов</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Более 500 довольных пассажиров каждый месяц
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="mx-auto max-w-2xl">
                    <CardContent className="p-8 text-center">
                      <Quote className="w-12 h-12 text-primary mx-auto mb-6 opacity-20" />
                      
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>

                      <p className="text-lg text-muted-foreground mb-6 italic leading-relaxed">
                        "{testimonial.text}"
                      </p>

                      <div>
                        <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.route}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Card className="inline-block p-6 bg-white">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">Средний рейтинг</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Отзывов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Рекомендуют</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;