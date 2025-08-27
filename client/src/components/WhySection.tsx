import { Clock, Shield, Car, Baby, Luggage, MapPin, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const WhySection = () => {
  return (
    <section id="why" className="py-20 bg-muted">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Почему выбирают <span className="gradient-primary bg-clip-text text-transparent">NeuroGO</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Всё для того, чтобы поездка была комфортной и вовремя
          </p>
        </div>

        {/* 4 key reasons — light cards, consistent rhythm */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Clock, title: 'Пунктуальность', desc: 'Водители приезжают заранее' },
            { icon: Shield, title: 'Качество', desc: 'Авто проходят регулярный техосмотр' },
            { icon: Car, title: 'Комфорт', desc: 'Современные машины с Wi-Fi и зарядками' },
            { icon: Award, title: 'Опыт', desc: 'Стаж работы водителей от 5 лет' },
          ].map((r, i) => (
            <Card
              key={i}
              className="h-full transition-shadow hover:shadow-md border-border/70"
            >
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-[#6E56CF] to-[#11C76F] text-white flex items-center justify-center mb-4">
                  <r.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{r.title}</h3>
                <p className="text-md text-muted-foreground">{r.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add-ons — single cohesive panel with chips */}
        <Card className="border-border/70">
          <CardContent className="p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-center md:text-left">
                <h4 className="text-lg md:text-xl font-semibold">Дополнительные опции</h4>
                <p className="text-muted-foreground">
                  Добавьте при оформлении заказа — учтём в расчёте.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5">
                {[
                  { icon: Baby, label: 'Детские кресла' },
                  { icon: Luggage, label: 'Помощь с багажом' },
                  { icon: MapPin, label: 'Остановки по пути' },
                ].map((s, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-md"
                  >
                    <s.icon className="w-4 h-4 text-foreground/80" />
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
