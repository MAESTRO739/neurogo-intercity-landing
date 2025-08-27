import { Card, CardContent } from '../components/ui/card';
import { Phone, Car, MapPin } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Phone,
      number: '01',
      title: 'Заявка',
      description: 'Позвоните нам, напишите в WhatsApp или заполните форму на сайте. Указывайте точные адреса и время.',
      color: 'gradient-primary'
    },
    {
      icon: Car,
      number: '02', 
      title: 'Подача автомобиля',
      description: 'Водитель приезжает заранее и ждёт вас. Получите SMS с данными автомобиля и контактом водителя.',
      color: 'gradient-secondary'
    },
    {
      icon: MapPin,
      number: '03',
      title: 'Комфортная поездка',
      description: 'Наслаждайтесь комфортной поездкой. Оплата наличными или картой производится при посадке.',
      color: 'gradient-accent'
    }
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Как это <span className="gradient-primary bg-clip-text text-transparent">работает</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Простой процесс заказа в три шага
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-primary to-secondary transform -translate-y-1/2 z-0"></div>
              )}
              
              <Card className="relative z-10 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 relative`}>
                    <step.icon className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-primary">
                      <span className="text-xs font-bold text-primary">{step.number}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-accent p-8 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Дополнительная информация</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <strong className="text-foreground">Время подачи:</strong><br />
                В городе: 15-30 минут<br />
                За город: 30-60 минут<br />
                Предварительный заказ: точно в указанное время
              </div>
              <div>
                <strong className="text-foreground">Способы оплаты:</strong><br />
                Наличные при посадке<br />
                Банковская карта при посадке<br />
                Безналичная оплата для юридических лиц
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;