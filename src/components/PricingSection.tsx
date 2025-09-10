import React from 'react';
import { Car, Crown, Truck, Coins} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Feather, Hairline } from './ui/section-divider';

const Pricing = () => {
  const carClasses = [
    {
      icon: <Car className="h-8 w-8" />,
      name: 'Эконом',
      pricePerKm: '35₽',
      description: 'Седан эконом-класса',
    },
    {
      icon: <Car className="h-8 w-8" />,
      name: 'Комфорт',
      pricePerKm: '45₽',
      description: 'Седан комфорт-класса',
      popular: true,
    },
    {
      icon: <Crown className="h-8 w-8" />,
      name: 'Бизнес',
      pricePerKm: '55₽',
      description: 'Седан бизнес-класса',
    },
    {
      icon: <Truck className="h-8 w-8" />,
      name: 'Минивэн',
      pricePerKm: '65₽',
      description: 'Просторный минивэн',
    },
  ];

  return (
    <section id="pricing" className="pb-20 bg-[#0A0E22]">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0" style={{ background:'#0A0E22' }} />
        <div className="absolute inset-0"
            style={{ background:'linear-gradient(180deg,#0A0E22 0%,#0B122B 50%,#0A0E22 100%)' }} />
        <div className="absolute inset-0"
            style={{ backgroundImage:[
              'radial-gradient(820px 420px at 16% 10%, rgba(123,97,255,0.16), transparent 62%)',
              'radial-gradient(900px 520px at 84% 76%, rgba(0,230,168,0.12), transparent 64%)'
            ].join(',') }} />
        <div className="absolute inset-0"
            style={{ mixBlendMode:'screen', opacity:.10,
                      background:'linear-gradient(100deg,rgba(255,255,255,.07) 0%,rgba(255,255,255,0) 38%,rgba(255,255,255,.05) 72%,rgba(255,255,255,0) 100%)' }} />
        <div className="absolute inset-0"
            style={{ opacity:.03,
                      backgroundImage:'radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)',
                      backgroundSize:'3px 3px' }} />
      </div>
      <Hairline />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl
                      bg-gradient-to-br from-[#7B61FF] to-[#00E6A8] text-white shadow-lg shadow-black/30"
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Coins className="h-10 w-10" />
          </motion.div>
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
                    <span className="bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] text-white px-6 py-1 rounded-full text-sm font-medium shadow">
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

                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{carClass.name}</h3>
                  <p className="text-white/70 mb-4">{carClass.description}</p>
                  <div className="text-3xl font-bold text-[#7B61FF] mb-2">{carClass.pricePerKm}</div>
                  <p className="text-sm text-white/60">за километр</p>
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
          <motion.div
          className="text-center"
          initial={{ y: 18, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Button size="lg" asChild className="bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] text-white shadow hover:opacity-90">
            <a href="#hero">Рассчитать стоимость</a>
          </Button>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
