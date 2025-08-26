import { Button } from '@/components/ui/button';
import { Phone, MessageCircle } from 'lucide-react';
import BookingForm from './BookingForm';
import heroImage from '@/assets/hero-taxi.jpg';

const HeroSection = () => {
  const handlePhoneCall = () => {
    window.location.href = 'tel:+79991234567';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/79991234567?text=Здравствуйте! Хочу заказать поездку через NeuroGO', '_blank');
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Современное такси NeuroGO" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Междугородние поездки и трансферы в аэропорт —{' '}
              <span className="gradient-primary bg-clip-text text-transparent">
                вовремя и с комфортом
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Предварительный заказ на точное время. Опытные водители. 
              Оплата наличными или картой — при посадке.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={handlePhoneCall}
                className="gap-3"
              >
                <Phone className="w-5 h-5" />
                Заказать по телефону
              </Button>
              <Button 
                variant="whatsapp" 
                size="lg" 
                onClick={handleWhatsApp}
                className="gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                Заказать через WhatsApp
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-white/80">Поездок в месяц</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.9</div>
                <div className="text-sm text-white/80">Рейтинг водителей</div>
              </div>
              <div>
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-white/80">Работаем круглосуточно</div>
              </div>
            </div>
          </div>

          {/* Right Content - Booking Form */}
          <div className="flex justify-center lg:justify-end">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;