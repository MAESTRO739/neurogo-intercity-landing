import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import WhySection from '../components/WhySection';
import PricingSection from '../components/PricingSection';
import TransfersSection from '../components/TransfersSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <WhySection />
      <PricingSection />
      <TransfersSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
