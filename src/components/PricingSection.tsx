import React from 'react';
import { Car, Crown, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing = () => {
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
      highlights: ['6–7 мест, большой багаж'],
    },
  ];

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-[#0A0E22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Тарифы <span className="bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] bg-clip-text text-transparent">поездок</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Стоимость рассчитывается по формуле: расстояние × класс автомобиля + дополнительные услуги
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {carClasses.map((carClass, index) => (
            <motion.div
              key={index}
              className="h-full"
              variants={{ hidden: { y: 22, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div
                className={`h-full flex flex-col rounded-2xl p-7 shadow-lg hover:shadow-xl transition-shadow relative ${
                  carClass.popular
                    ? 'bg-white/[0.06] border border-white/20 ring-2 ring-[#7B61FF]'
                    : 'bg-white/[0.04] border border-white/10'
                }`}
              >
                {carClass.popular && (
                  <motion.div
                    className="absolute inset-x-0 -top-5 flex justify-center pointer-events-none"
                    initial={{ scale: 0.85, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.35, ease: 'easeOut', delay: 0.15 }}
                  >
                    <span className="bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] text-white px-6 py-1.5 rounded-full text-sm font-medium shadow">
                      Популярный
                    </span>
                  </motion.div>
                )}

                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 ${
                    carClass.popular
                      ? 'bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] text-white'
                      : 'bg-white/[0.06] text-white/80'
                  }`}
                >
                  {carClass.icon}
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{carClass.name}</h3>
                  <p className="text-white/70 mb-4">{carClass.description}</p>
                  <div className="text-3xl font-bold text-[#7B61FF] mb-2">{carClass.pricePerKm}</div>
                  <p className="text-sm text-white/60">за километр</p>
                </div>

                <div className="flex flex-wrap justify-center text-center mt-auto gap-2">
                  {carClass.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-full bg-white/[0.06] text-white/80 border border-white/10 px-4 py-2 text-sm font-medium"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <motion.p
            className="text-white/70 mb-4"
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            * Ожидание — 5₽/мин после 15 минут бесплатного ожидания.
          </motion.p>
          <motion.a
            href="#hero"
            className="inline-block bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] text-white px-8 py-4 rounded-lg hover:from-[#5433F5] hover:to-[#02A376] transition-colors font-medium shadow"
            initial={{ y: 18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
          >
            Рассчитать стоимость
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
