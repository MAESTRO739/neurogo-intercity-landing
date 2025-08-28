import { Clock, Shield, Car, Baby, Luggage, MapPin, Award } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const WhySection = () => {
  return (
    <section id="why" className="relative py-20 bg-[#0A0E22] overflow-hidden">
      {/* Background — sibling to Hero (not identical) */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* top lock so hero feather lands cleanly */}
        <div className="absolute -top-24 left-0 right-0 h-24" style={{ background: '#0A0E22' }} />

        {/* base: deeper vertical wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #0A0E22 0%, #0B122B 45%, #0A0E22 100%)'
          }}
        />

        {/* asymmetrical glows (shifted vs. Hero) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              // subtle violet bloom high-left
              'radial-gradient(700px 360px at 8% 12%, rgba(123,97,255,0.14), transparent 62%)',
              // teal bloom mid-right, lower opacity than hero
              'radial-gradient(820px 420px at 92% 38%, rgba(0,230,168,0.10), transparent 64%)',
              // faint purple belt near bottom center
              'radial-gradient(560px 200px at 50% 92%, rgba(110,86,207,0.10), transparent 70%)',
            ].join(',')
          }}
        />

        {/* diagonal “tech” sheen (different angle than hero) */}
        <div
          className="absolute inset-0"
          style={{
            mixBlendMode: 'screen',
            opacity: 0.10,
            background:
              'linear-gradient(115deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.05) 72%, rgba(255,255,255,0) 100%)'
          }}
        />

        {/* micro-noise for depth */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.05,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '3px 3px'
          }}
        />

        {/* VERY subtle grid—lighter than hero so it doesn’t fight content */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.04,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '80px 80px, 80px 80px',
            backgroundPosition: '0 0, 0 0'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
            Почему выбирают <span className="bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] bg-clip-text text-transparent">NeuroGO</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Всё для того, чтобы поездка была комфортной и вовремя
          </p>
        </div>

        {/* 4 key reasons — dark cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Clock, title: 'Пунктуальность', desc: 'Водители приезжают заранее' },
            { icon: Shield, title: 'Качество', desc: 'Авто проходят регулярный техосмотр' },
            { icon: Car, title: 'Комфорт', desc: 'Современные машины с Wi-Fi и зарядками' },
            { icon: Award, title: 'Опыт', desc: 'Стаж работы водителей от 5 лет' },
          ].map((r, i) => (
            <Card key={i} className="h-full bg-white/[0.04] border-white/10 hover:border-white/20 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-[#6E56CF] to-[#11C76F] text-white flex items-center justify-center mb-4">
                  <r.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">{r.title}</h3>
                <p className="text-sm text-white/70">{r.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add-ons — dark chip panel */}
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
      </div>
    </section>
  );
};

export default WhySection;
