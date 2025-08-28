import { Button } from '../components/ui/button';
import { MessageCircle, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const CTASection = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/79011000011?text=Здравствуйте! Хочу задать вопрос по NeuroGO', '_blank');
  };

  // shared animation presets (aligned with other sections)
  const fadeUp = { hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1 } };
  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

  return (
    <section id="cta" className="relative overflow-hidden py-20">
      {/* Background — same stack as Hero */}
      <div className="absolute inset-0 -z-10">
        {/* base hero gradient */}
        <div className="absolute inset-0 gradient-hero" />
        {/* veil for readability */}
        <div className="absolute inset-0 bg-black/50" />
        {/* orbs/glows */}
        <div className="absolute top-10 left-10 w-32 h-32 gradient-primary rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-10 right-10 w-40 h-40 gradient-secondary rounded-full blur-3xl opacity-40" />
      </div>

      {/* smooth transition from previous dark section */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 h-24 -z-10"
        style={{ background: 'linear-gradient(180deg,#0A0E22 0%, rgba(10,14,34,0) 100%)' }}
      />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          className="text-center text-white max-w-4xl mx-auto"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7B61FF] to-[#00E6A8] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-black/30"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.12 }}
          >
            <Gift className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">Готовы в путь?</h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Закажите поездку прямо сейчас и убедитесь в качестве нашего сервиса
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="mt-2 flex justify-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Primary */}
            <motion.div variants={fadeUp} transition={{ duration: 0.45, ease: 'easeOut' }}>
              <Button
                size="lg"
                className="gap-3 text-lg font-bold px-8 py-4 bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] text-white shadow hover:opacity-90"
              >
                <a href="#hero">Заказать поездку сейчас</a>
              </Button>
            </motion.div>

            {/* Secondary */}
            <motion.div variants={fadeUp} transition={{ duration: 0.45, ease: 'easeOut' }}>
              <Button
              size="lg"
              onClick={handleWhatsApp}
              className="w-full sm:w-auto gap-3 bg-gradient-to-r from-[#13C37B] to-[#00B88A] hover:from-[#10a96a] hover:to-[#009e7a] active:from-[#0d8a56] active:to-[#007a5a] text-white shadow-lg shadow-black/20 border-0"
              >
              <MessageCircle className="w-5 h-5" />
              Задать вопрос
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Promo pill*/}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="hidden sm:flex items-center justify-center w-full mt-6"
        >
          <motion.span
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
            className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-sm text-white/90"
          >
            Первая поездка -20% с промокодом <span className="mx-2 rounded bg-white/15 px-2 py-0.5 text-white">NEURO20</span>
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
