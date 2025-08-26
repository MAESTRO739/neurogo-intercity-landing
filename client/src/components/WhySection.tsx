import { Clock, Shield, Car, Users, Baby, Luggage, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const WhySection = () => {
  const reasons = [
    {
      icon: Clock,
      title: 'Точность во времени',
      description: 'Прибываем минута в минуту. Наши водители всегда приезжают заранее.'
    },
    {
      icon: Shield,
      title: 'Гарантия качества',
      description: 'Все автомобили проходят регулярный техосмотр. Водители с опытом от 5 лет.'
    },
    {
      icon: Car,
      title: 'Комфортные автомобили',
      description: 'Современные машины с кондиционером, Wi-Fi и зарядками для устройств.'
    },
    {
      icon: Users,
      title: 'Любые расстояния',
      description: 'От города до города, в аэропорт, на дачу — везде, куда нужно добраться.'
    }
  ];

  const services = [
    {
      icon: Baby,
      title: 'Детские кресла',
      description: 'Безопасные детские кресла любых возрастов'
    },
    {
      icon: Luggage,
      title: 'Помощь с багажом',
      description: 'Водитель поможет с погрузкой и выгрузкой'
    },
    {
      icon: MapPin,
      title: 'Остановки в пути',
      description: 'Можем сделать остановки по вашему маршруту'
    }
  ];

  return (
    <section id="why" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Почему выбирают <span className="gradient-primary bg-clip-text text-transparent">NeuroGO</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Мы создали сервис, которому можно доверить самые важные поездки
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {reasons.map((reason, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <reason.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                <p className="text-muted-foreground text-sm">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-8">Дополнительные услуги</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 gradient-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">{service.title}</h4>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;