import { Card, CardContent } from '../components/ui/card';
import { Phone, Car, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Phone,
      number: '01',
      title: 'Заявка',
      description: 'Позвоните нам, напишите в WhatsApp или заполните форму на сайте. Указывайте точные адреса и время.',
      badge: 'gradient-primary',
    },
    {
      icon: Car,
      number: '02',
      title: 'Звонок диспетчера (через ~3 минуты)',
      description: 'Подтвердим заказ и озвучим итоговую стоимость (на сайте показывается только ориентировочная).',
      badge: 'gradient-secondary',
    },
    {
      icon: MapPin,
      number: '03',
      title: 'Звонок водителя + SMS',
      description: 'Через 10–15 минут позвонит водитель для уточнения деталей. Ещё через ~5 минут придёт SMS с данными автомобиля.',
      badge: 'gradient-accent',
    },
  ];

  // Shared motion presets (same as other sections)
  const fadeUp = { hidden: { y: 22, opacity: 0 }, show: { y: 0, opacity: 1 } };
  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

  return (
    <section id="how-it-works" className="relative py-20 bg-[#0A0E22] overflow-hidden">
      {/* Background (techy but subtle) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg,#0A0E22 0%, #0B122B 55%, #0A0E22 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(780px 380px at 12% 10%, rgba(123,97,255,0.12), transparent 62%),' +
              'radial-gradient(880px 420px at 88% 85%, rgba(0,230,168,0.10), transparent 64%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            mixBlendMode: 'screen',
            opacity: 0.08,
            background:
              'linear-gradient(112deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.04) 72%, rgba(255,255,255,0) 100%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Как это{' '}
            <span className="bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] bg-clip-text text-transparent">
              работает
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Простой процесс заказа в три шага
          </p>
        </motion.div>

        { /* Steps */}
          <motion.div
            className="relative grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative"
              >
                {/* connector line on md+ */}
                {i < steps.length - 1 && (
            <div
              className="
                hidden md:block
                absolute top-14 left-full -translate-y-1/2 z-0
                w-8 h-[2px] rounded-full
                bg-[linear-gradient(90deg,rgba(123,97,255,.85),rgba(0,230,168,.85))]
                shadow-[0_0_12px_rgba(123,97,255,.35)]
              "
            />
                )}

                <Card className="h-full bg-white/[0.04] border-white/10 hover:border-white/20 transition-colors">
            <CardContent className="p-8 text-center">
              <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] bg-gradient-to-br"
                style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))` }}
              >
                <div className={`absolute inset-0 rounded-2xl ${step.badge} opacity-100`} />
                <step.icon className="relative z-10 h-8 w-8" />
                <div className="absolute -top-2 -right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/20 bg-white/95 text-[#7B61FF] font-bold text-xs">
                  {step.number}
                </div>
              </div>

              <h3 className="text-lg font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-white/70 leading-relaxed text-sm">{step.description}</p>
            </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

        {/* Info panel */}
        <motion.div
          className="relative max-w-4xl mx-auto mt-12"
          initial={{ y: 18, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-8 md:p-10">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Дополнительная информация</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
                <p className="text-white/70">
                  <span className="font-semibold text-white text-base">Время подачи:</span><br />
                  <span className="text-sm">
                    В городе: 15–30 минут<br />
                    За город: 30–60 минут<br />
                    Предварительный заказ: точно в указанное время
                  </span>
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
                <p className="text-white/70">
                  <span className="font-semibold text-white text-base">Способы оплаты:</span><br />
                  <span className="text-sm">
                  Наличные при посадке<br />
                  Банковская карта при посадке<br />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
