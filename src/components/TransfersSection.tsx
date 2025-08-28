import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Plane, Shield, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Hairline } from './ui/section-divider';

const TransfersSection = () => {
  const airports = ['Домодедово', 'Шереметьево', 'Внуково', 'Жуковский', 'Остафьево'];

  const features = [
    { icon: Shield, title: 'Гарантия вовремя', description: 'Подача заранее и маршрут без сюрпризов.' },
    { icon: Clock,  title: 'Отслеживаем рейсы', description: 'Учитываем задержки/переносы вылетов.' },
    { icon: MapPin, title: 'Meet & Greet',      description: 'Встреча с табличкой и помощь с багажом.' },
  ];

  const fadeUp = { hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1 } };
  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

  return (
    <section id="transfers" className="relative pb-20 bg-[#0A0E22] overflow-hidden">
      {/* Background (dark, techy, but calmer than Hero) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0"
            style={{ background:'linear-gradient(180deg,#0A0E22 0%,#0B122B 55%,#0A0E22 100%)' }} />
        <div className="absolute inset-0"
            style={{ backgroundImage:[
              'radial-gradient(800px 380px at 12% 8%, rgba(123,97,255,0.12), transparent 62%)',
              'radial-gradient(760px 420px at 88% 70%, rgba(0,230,168,0.10), transparent 64%)'
            ].join(',') }} />
        <div className="absolute inset-0"
            style={{ mixBlendMode:'screen', opacity:.08,
                      background:'linear-gradient(110deg,rgba(255,255,255,.06) 0%,rgba(255,255,255,0) 38%,rgba(255,255,255,.04) 72%,rgba(255,255,255,0) 100%)' }} />
      </div>
      <Hairline />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={stagger}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7B61FF] to-[#00E6A8] text-white shadow-lg shadow-black/30"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Plane className="h-10 w-10" />
          </motion.div>

          <motion.h2 className="text-3xl md:text-4xl font-bold mb-3 text-white" variants={fadeUp}>
            Трансферы в <span className="bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] bg-clip-text text-transparent">аэропорты</span>
          </motion.h2>

          <motion.p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto" variants={fadeUp}>
            Бронируйте заранее — приедем вовремя, поможем с багажом и довезём без спешки.
          </motion.p>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          variants={stagger}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={{ hidden: { y: 22, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <Card className="h-full bg-white/[0.05] border-white/10 hover:border-white/20 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6E56CF] to-[#11C76F] text-white">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{f.title}</h3>
                  <p className="text-white/70 text-sm">{f.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Airports list */}
        <motion.div
          className="mb-12 flex flex-wrap items-center justify-center gap-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {airports.map((a) => (
            <motion.span
              key={a}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm text-white"
              variants={{ hidden: { y: 22, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              whileHover={{ scale: 1.04 }}
            >
              <MapPin className="h-4 w-4 text-white/80" />
              {a}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ y: 18, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Button size="lg" asChild className="bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] text-white shadow hover:opacity-90">
            <a href="#hero">Забронировать трансфер</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TransfersSection;
