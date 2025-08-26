import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const carClasses = [
    {
      name: 'Эконом',
      price: '35',
      description: 'Chevrolet Lanos, Renault Logan',
      features: ['4 места', 'Кондиционер', 'Радио']
    },
    {
      name: 'Комфорт',
      price: '45',
      description: 'Volkswagen Polo, Hyundai Solaris',
      features: ['4 места', 'Климат-контроль', 'USB зарядка', 'Wi-Fi']
    },
    {
      name: 'Бизнес',
      price: '65',
      description: 'Toyota Camry, Volkswagen Passat',
      features: ['4 места', 'Кожаный салон', 'Премиум аудио', 'Wi-Fi', 'Вода в салоне']
    },
    {
      name: 'Минивэн',
      price: '55',
      description: 'Volkswagen Caravelle, Ford Transit',
      features: ['7-8 мест', 'Большой багажник', 'Кондиционер', 'USB зарядка']
    }
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Тарифы и <span className="gradient-primary bg-clip-text text-transparent">классы автомобилей</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Стоимость рассчитывается: расстояние × тариф за км + дополнительные услуги. 
            Минимальная стоимость поездки — 1000 рублей.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {carClasses.map((carClass, index) => (
            <Card key={index} className="relative hover:shadow-xl transition-shadow">
              {carClass.name === 'Комфорт' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="gradient-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                    Популярный
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{carClass.name}</CardTitle>
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                  {carClass.price} ₽<span className="text-sm text-muted-foreground">/км</span>
                </div>
                <p className="text-sm text-muted-foreground">{carClass.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {carClass.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-accent p-6 rounded-lg max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-2">Примеры стоимости популярных маршрутов</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Москва → Домодедово:</strong><br />
                Эконом: от 1,400 ₽ | Комфорт: от 1,800 ₽
              </div>
              <div>
                <strong>Москва → Тула:</strong><br />
                Эконом: от 7,000 ₽ | Комфорт: от 9,000 ₽
              </div>
              <div>
                <strong>Москва → Калуга:</strong><br />
                Эконом: от 6,300 ₽ | Комфорт: от 8,100 ₽
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;