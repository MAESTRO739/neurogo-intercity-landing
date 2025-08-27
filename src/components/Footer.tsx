import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const navigation = [
    { name: 'Главная', href: '#hero' },
    { name: 'Почему NeuroGO', href: '#why' },
    { name: 'Тарифы', href: '#pricing' },
    { name: 'Трансферы', href: '#transfers' },
    { name: 'Отзывы', href: '#testimonials' }
  ];

  const handlePhoneCall = () => {
    window.location.href = 'tel:+79991234567';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/79991234567', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:info@neurotaxi.ru';
  };

  return (
    <footer id="contacts" className="bg-foreground text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 gradient-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-2xl font-bold">NeuroGO</span>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              Современный сервис междугородних поездок и трансферов в аэропорт. 
              Надёжно, комфортно, точно по времени.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={handlePhoneCall}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <Phone className="w-5 h-5" />
              </button>
              <button 
                onClick={handleWhatsApp}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              <button 
                onClick={handleEmail}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+79991234567" className="text-white/80 hover:text-white transition-colors">
                  +7 (999) 123-45-67
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span className="text-white/80">WhatsApp</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:info@neurotaxi.ru" className="text-white/80 hover:text-white transition-colors">
                  info@neurotaxi.ru
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-white/80">
                  Москва и<br />Московская область
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 gradient-accent rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">N</span>
              </div>
              <span className="text-white/60">© 2024 NeuroGO. Все права защищены.</span>
            </div>
            <div className="text-sm text-white/60">
              Работаем 24/7 • Лицензия на пассажирские перевозки
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;