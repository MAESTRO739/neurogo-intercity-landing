import React from 'react';
import { Car, Users, Crown, Truck } from 'lucide-react';

const Pricing = () => {
  // Replace carClasses with a minimal, essential set
  const carClasses = [
    {
      icon: <Car className="h-8 w-8" />,
      name: 'Эконом',
      pricePerKm: '25₽',
      description: 'Седан эконом-класса',
      highlights: ['Выгодно на дальних расстояниях'],
    },
    {
      icon: <Car className="h-8 w-8" />,
      name: 'Комфорт',
      pricePerKm: '35₽',
      description: 'Седан комфорт-класса',
      highlights: ['Оптимальный баланс цены и сервиса'],
      popular: true,
    },
    {
      icon: <Crown className="h-8 w-8" />,
      name: 'Бизнес',
      pricePerKm: '50₽',
      description: 'Седан бизнес-класса',
      highlights: ['Для деловых поездок'],
    },
    {
      icon: <Truck className="h-8 w-8" />,
      name: 'Минивэн',
      pricePerKm: '40₽',
      description: 'Просторный минивэн',
      highlights: ['6–7 мест', 'Большой багаж'],
    },
  ];

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Тарифы и классы автомобилей
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Стоимость рассчитывается по формуле: расстояние × класс автомобиля + дополнительные услуги
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {carClasses.map((carClass, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl p-7 shadow-lg hover:shadow-xl transition-shadow relative ${
                carClass.popular ? 'ring-2 ring-violet-600 transform scale-105' : ''
              }`}
            >
              {carClass.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-violet-600 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                    Популярный
                  </span>
                </div>
              )}

              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 ${
                carClass.popular 
                  ? 'bg-gradient-to-r from-violet-600 to-teal-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {carClass.icon}
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {carClass.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {carClass.description}
                </p>
                <div className="text-3xl font-bold text-violet-600 mb-2">
                  {carClass.pricePerKm}
                </div>
                <p className="text-sm text-gray-500">за километр</p>
              </div>

              <div className="flex flex-wrap justify-center text-center">
                {carClass.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-4 py-2 text-sm font-medium"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            * Ожидание — 5₽/мин после 15 минут бесплатного ожидания.
          </p>
          <a
            href="#hero"
            className="inline-block bg-violet-600 text-white px-8 py-4 rounded-lg hover:bg-violet-700 transition-colors font-medium"
          >
            Рассчитать точную стоимость
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;