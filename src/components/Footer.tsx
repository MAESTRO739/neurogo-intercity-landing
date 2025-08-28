import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import logo from "../assets/logo.png";

const Footer = () => {
  const navigation = [
    { name: 'Главная', href: '#hero' },
    { name: 'Почему Мы', href: '#why' },
    { name: 'Тарифы', href: '#pricing' },
    { name: 'Трансферы', href: '#transfers' },
    { name: 'Как это работает', href: '#how-it-works' },
    { name: 'Отзывы', href: '#testimonials' }
  ];

  const handlePhoneCall = () => window.location.href = 'tel:+78003000000';
  const handleWhatsApp = () => window.open('https://wa.me/79011000011', '_blank');
  const handleEmail = () => window.location.href = 'mailto:info@neuro-go.ru';

  return (
    <footer
      id="contacts"
      className="bg-gradient-to-r from-[#05060F] via-[#0B0F1E] to-[#05060F] border-t border-white/10 text-white py-16"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo + About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="NeuroGO" className="h-8" />
              <span className="text-2xl font-bold">NeuroGO</span>
            </div>
            <p className="text-white/70 mb-6 max-w-md leading-relaxed">
              Современный сервис междугородних поездок и трансферов в аэропорт. 
              Надёжно, комфортно, точно по времени.
            </p>
            <div className="flex gap-3">
              {[ 
                { icon: Phone, onClick: handlePhoneCall },
                { icon: MessageCircle, onClick: handleWhatsApp },
                { icon: Mail, onClick: handleEmail }
              ].map(({ icon: Icon, onClick }, i) => (
                <button
                  key={i}
                  onClick={onClick}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-5 h-5 text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-3 text-white/70">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#7B61FF]" />
                <a href="tel:+78003000000" className="hover:text-white transition-colors">
                  +7 (800) 300-00-00
                </a>
              </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-[#00E6A8]" />
                  <a
                    href="https://wa.me/79011000011"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#7B61FF]" />
                <a href="mailto:info@neuro-go.ru" className="hover:text-white transition-colors">
                  info@neuro-go.ru
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              © 2024 NeuroGO. Все права защищены.
            </div>
            <div>
              Работаем 24/7
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
