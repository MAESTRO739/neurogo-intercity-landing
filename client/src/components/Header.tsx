import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Почему Мы', href: '#why' },
    { name: 'Тарифы', href: '#pricing' },
    { name: 'Трансферы', href: '#transfers' },
    { name: 'Как это работает', href: '#how-it-works' },
    { name: 'Отзывы', href: '#testimonials' },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo (link to hero) */}
          <a href="#hero" className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-2xl lg:text-3xl sm:text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              NeuroGO
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Phone */}
          <div className="hidden md:block">
            <Button variant="phone" size="lg" className="flex items-center bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition-colors">
              <Phone className="w-4 h-4" />
              +7 (800) 300-00-00
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg">
            <nav className="flex flex-col space-y-4 p-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button variant="phone" size="lg" className="flex items-center  bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition-colors">
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