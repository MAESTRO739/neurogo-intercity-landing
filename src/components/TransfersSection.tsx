import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, Shield, Clock, Star } from 'lucide-react';

const TransfersSection = () => {
  const airports = [
    'Домодедово', 'Шереметьево', 'Внуково', 
    'Жуковский', 'Остафьево'
  ];

  const benefits = [
    {
      icon: Shield,
      title: '100% гарантия',
      description: 'Если опоздаете на рейс по нашей вине — полный возврат средств'
    },
    {
      icon: Clock,
      title: 'Приезжаем заранее',
      description: 'Водитель прибывает за 15-20 минут до назначенного времени'
    },
    {
      icon: Star,
      title: 'Отслеживание рейсов',
      description: 'Мониторим изменения в расписании и корректируем время подачи'
    }
  ];

  return (
    <section id="transfers" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Plane className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Трансферы в <span className="gradient-primary bg-clip-text text-transparent">аэропорты</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Специализируемся на поездках в аэропорт. Гарантируем, что вы успеете на свой рейс.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">Работаем со всеми аэропортами Москвы</h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {airports.map((airport, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg">
                  <Plane className="w-5 h-5 text-primary" />
                  <span className="font-medium">{airport}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Особенности трансферов:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Встреча с табличкой в зале прилёта</li>
                <li>• Помощь с багажом</li>
                <li>• Детские кресла по запросу</li>
                <li>• SMS уведомления о статусе поездки</li>
                <li>• Возможность изменить время за 2 часа до поездки</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 gradient-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Card className="inline-block p-8 gradient-accent text-white">
            <div className="mb-4">
              <h3 className="text-2xl font-bold mb-2">Специальное предложение</h3>
              <p className="text-white/90">Обратный трансфер с аэропорта со скидкой 15%</p>
            </div>
            <Button variant="secondary" size="lg">
              Забронировать трансфер
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TransfersSection;