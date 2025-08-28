import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
import logo from "../assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePhoneCall = () => (window.location.href = 'tel:+78003000000');

  const navigation = [
    { name: 'Почему Мы', href: '#why' },
    { name: 'Тарифы', href: '#pricing' },
    { name: 'Трансферы', href: '#transfers' },
    { name: 'Как это работает', href: '#how-it-works' },
    { name: 'Отзывы', href: '#testimonials' },
  ];

  // add state
  const [atTop, setAtTop] = useState(true);

  // add effect
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 2);
    onScroll(); // initialize
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 border-b ${
      atTop
        ? 'bg-gradient-to-r from-[#05060F] via-[#0B0F1E] to-[#05060F]'
        : 'bg-gradient-to-r from-black/60 via-[#10142a]/60 to-black/60 backdrop-blur-md'
      } border-white/10`}
    >
      <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2">
          <img src={logo} alt="NeuroGO" className="h-8" />
          <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] bg-clip-text text-transparent">
            NeuroGO
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
        {navigation.map((item) => (
          <a
          key={item.name}
          href={item.href}
          className="text-white/90 hover:text-white transition-colors font-medium"
          >
          {item.name}
          </a>
        ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
        <Button
          size="lg"
          className="flex items-center bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] text-white px-5 py-2 rounded-lg shadow hover:opacity-90"
          onClick={handlePhoneCall}
        >
          <Phone className="w-4 h-4" />
          +7 (800) 300-00-00
        </Button>
        </div>

        {/* Mobile Menu */}
        <button
        className="lg:hidden p-2 text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-black/90 via-[#10142a]/90 to-black/90 backdrop-blur-md border-b border-white/10 shadow-lg">
        <nav className="flex flex-col space-y-4 p-4">
          {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-white/80 hover:text-white transition-colors font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            {item.name}
          </a>
          ))}
          <Button
            size="lg"
            className="flex items-center bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] text-white px-5 py-2 rounded-lg shadow hover:opacity-90"
            onClick={handlePhoneCall}
          >
          <Phone className="w-4 h-4" />
            +7 (800) 300-00-00
          </Button>
        </nav>
        </div>
      )}
      </div>
    </header>
  );
};

export default Header;
