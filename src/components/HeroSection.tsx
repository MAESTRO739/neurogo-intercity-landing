import { Button } from '../components/ui/button';
import { Phone, MessageCircle } from 'lucide-react';
import BookingForm from './BookingForm';
import PromoBar from './PromoBar';

const HeroSection = () => {
  const handlePhoneCall = () => (window.location.href = 'tel:+78003000000');
  const handleWhatsApp = () =>
    window.open('https://wa.me/78003000000?text=Здравствуйте! Хочу заказать поездку через NeuroGO', '_blank');

  return (
    <section id="hero" className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-black/50" /> {/* veil for readability */}
        <div className="absolute top-10 left-10 w-32 h-32 gradient-primary rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-10 right-10 w-40 h-40 gradient-secondary rounded-full blur-3xl opacity-40" />
      </div>

      {/* bottom feather into Why */}
      <div
        className="absolute inset-x-0 bottom-0 h-24"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,14,34,0) 0%, #0A0E22 100%)'
        }}
      />

      <div>
        <div className="absolute inset-x-0 top-0">
          <PromoBar />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            {/* Left */}
            <div className="text-white w-full lg:max-w-xl mx-auto">
              <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-bold leading-tight mb-6">
                Поездки между городами и в аэропорт —{' '}
                <span className="bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] bg-clip-text text-transparent">
                  без опозданий
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/85 mb-8 leading-relaxed">
                Бронируйте заранее и приезжайте вовремя: комфортный транспорт и опытные водители.
              </p>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button
                  size="lg"
                  onClick={handlePhoneCall}
                  className="w-full sm:w-auto gap-3 bg-gradient-to-r from-[#7B61FF] to-[#6E56CF] hover:from-[#6E56CF] hover:to-[#5a45b5] active:from-[#5a45b5] active:to-[#4e3fa6] text-white shadow-lg shadow-black/20"
                >
                  <Phone className="w-5 h-5" />
                  Заказать по телефону
                </Button>

                <Button
                  size="lg"
                  onClick={handleWhatsApp}
                  className="w-full sm:w-auto gap-3 bg-gradient-to-r from-[#13C37B] to-[#00B88A] hover:from-[#10a96a] hover:to-[#009e7a] active:from-[#0d8a56] active:to-[#007a5a] text-white shadow-lg shadow-black/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  Заказать через WhatsApp
                </Button>
                </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                {[
                  { n: '3 000+', t: 'Поездок в месяц' },
                  { n: '4.9', t: 'Рейтинг водителей' },
                  { n: '20+', t: 'Лет на рынке' },
                ].map((s) => (
                  <div key={s.t} className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
                    <div className="text-2xl font-bold text-white">{s.n}</div>
                    <div className="text-sm text-white/80">{s.t}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right (Booking Form) */}
            <div className="w-full lg:w-auto flex justify-center lg:justify-end">
              <div className="w-full max-w-md lg:max-w-none">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
