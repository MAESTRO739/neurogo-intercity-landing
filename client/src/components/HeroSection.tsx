import { Button } from '@/components/ui/button';
import { Phone, MessageCircle } from 'lucide-react';
import BookingForm from './BookingForm';

const HeroSection = () => {
  const handlePhoneCall = () => {
    window.location.href = 'tel:+78003000000';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/78003000000?text=Здравствуйте! Хочу заказать поездку через NeuroGO', '_blank');
  };

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* base neuro gradient */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 gradient-primary rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 gradient-secondary rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 gradient-accent rounded-full blur-xl"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-between gap-10 lg:gap-16 text-center lg:text-left">
          {/* Left Content */}
          <div className="text-white w-full lg:max-w-xl mx-auto">
            <div className="flex flex-col items-center lg:items-start">
              <h1 className="text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] text-[2rem] sm:text-[2.25rem] md:text-[3rem] font-bold leading-tight mb-4">
                Поездки между городами и в аэропорт — <span className="text-white">без опозданий</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/85 mb-8 leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.25)]">
                Бронируйте заранее и приезжайте вовремя: комфортный транспорт и опытные водители.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button
                size="lg"
                onClick={handlePhoneCall}
                className="w-full sm:w-auto gap-3 bg-[#6E56CF] hover:bg-[#5a45b5] active:bg-[#4e3fa6] text-white shadow-lg shadow-black/20"
              >
                <Phone className="w-5 h-5" />
                Заказать по телефону
              </Button>

              <Button
                size="lg"
                onClick={handleWhatsApp}
                className="w-full sm:w-auto gap-3 bg-[#11C76F] hover:bg-[#0ea35b] active:bg-[#0c8f4a] text-white shadow-lg shadow-black/20"
              >
                <MessageCircle className="w-5 h-5" />
                Заказать через WhatsApp
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {[
                { n: '3 000+', t: 'Поездок в месяц' },
                { n: '4.9', t: 'Рейтинг водителей' },
                { n: '20+', t: 'Лет на рынке' },
              ].map((s) => (
                <div key={s.t} className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
                  <div className="text-2xl font-bold text-white">{s.n}</div>
                  <div className="text-sm text-white/80">{s.t}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Booking Form */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-none">
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default HeroSection;