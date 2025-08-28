import { Clock, Shield, Car, Baby, Luggage, MapPin, Award, Briefcase } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { motion } from 'framer-motion';
import { Hairline } from './ui/section-divider';

const WhySection = () => {
  return (
    <section id="why" className="relative bg-[#0A0E22] overflow-hidden pb-20">
      {/* Background — sibling to Hero (not identical) */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-0 right-0 h-24" style={{ background:'#0A0E22' }} />
        <div className="absolute inset-0"
            style={{ background:'linear-gradient(180deg,#0A0E22 0%,#0B122B 45%,#0A0E22 100%)' }} />
        <div className="absolute inset-0"
            style={{ backgroundImage:[
              'radial-gradient(760px 360px at 8% 12%, rgba(123,97,255,0.14), transparent 62%)',
              'radial-gradient(820px 420px at 92% 38%, rgba(0,230,168,0.10), transparent 64%)',
              'radial-gradient(560px 200px at 50% 92%, rgba(110,86,207,0.10), transparent 70%)'
            ].join(',') }} />
        <div className="absolute inset-0"
            style={{ mixBlendMode:'screen', opacity:.10,
                      background:'linear-gradient(115deg,rgba(255,255,255,.07) 0%,rgba(255,255,255,0) 40%,rgba(255,255,255,.05) 72%,rgba(255,255,255,0) 100%)' }} />
        <div className="absolute inset-0"
            style={{ opacity:.035,
                      backgroundImage:'linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)',
                      backgroundSize:'80px 80px,80px 80px' }} />
      </div>
      <Hairline />
      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
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
            <Award className="h-10 w-10" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
            Почему выбирают <span className="bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] bg-clip-text text-transparent">NeuroGO</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Всё для того, чтобы поездка была комфортной и вовремя
          </p>
        </motion.div>

        {/* 4 key reasons — dark cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {[
            { icon: Clock, title: 'Пунктуальность', desc: 'Водители приезжают заранее' },
            { icon: Shield, title: 'Качество', desc: 'Авто проходят регулярный техосмотр' },
            { icon: Car, title: 'Комфорт', desc: 'Современные машины с Wi-Fi и зарядками' },
            { icon: Briefcase, title: 'Опыт', desc: 'Стаж работы водителей от 5 лет' },
          ].map((r, i) => (
            <motion.div
              variants={{ hidden: { y: 22, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <Card key={i} className="h-full bg-white/[0.04] border-white/10 hover:border-white/20 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-[#6E56CF] to-[#11C76F] text-white flex items-center justify-center mb-4">
                    <r.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-white">{r.title}</h3>
                  <p className="text-sm text-white/70">{r.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Add-ons — dark chip panel */}
        <motion.div
          initial={{ y: 22, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Card className="bg-white/[0.04] border-white/10">
            <CardContent className="p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-center md:text-left">
                  <h4 className="text-lg md:text-xl font-semibold text-white">Дополнительные опции</h4>
                  <p className="text-sm text-white/70">Добавьте при оформлении заказа — учтём в расчёте.</p>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5">
                  {[
                    { icon: Baby, label: 'Детские кресла' },
                    { icon: Luggage, label: 'Помощь с багажом' },
                    { icon: MapPin, label: 'Остановки по пути' },
                  ].map((s, idx) => (
                    <span key={idx} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-sm text-white">
                      <s.icon className="w-4 h-4 text-white/80" />
                      {s.label}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySection;
