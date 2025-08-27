import { Button } from '../components/ui/button';
import { Phone, MessageCircle, Gift } from 'lucide-react';

const CTASection = () => {
  const handlePhoneCall = () => {
    window.location.href = 'tel:+79991234567';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/79991234567?text=Здравствуйте! Хочу заказать поездку через NeuroGO', '_blank');
  };

  const scrollToForm = () => {
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 gradient-hero relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 gradient-primary rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 gradient-secondary rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 gradient-accent rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white max-w-4xl mx-auto">
          <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Gift className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Готовы в путь?
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Закажите поездку прямо сейчас и убедитесь в качестве нашего сервиса
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={scrollToForm}
              className="gap-3 text-lg font-bold px-8 py-4"
            >
              Заказать поездку сейчас
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handlePhoneCall}
                className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Phone className="w-5 h-5" />
                Позвонить
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleWhatsApp}
                className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </Button>
            </div>
          </div>

          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-white/90 font-medium">
              Первая поездка со скидкой 20% по промокоду{' '}
              <span className="font-bold text-white bg-white/20 px-2 py-1 rounded">NEURO20</span>
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">15 мин</div>
              <div className="text-white/80">Среднее время подачи</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-white/80">Работаем круглосуточно</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-white/80">Гарантия качества</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;