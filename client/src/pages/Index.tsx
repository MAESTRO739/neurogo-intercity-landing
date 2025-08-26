import Header from '@/components/Header';
import PromoBar from '@/components/PromoBar';
import HeroSection from '@/components/HeroSection';
import WhySection from '@/components/WhySection';
import PricingSection from '@/components/PricingSection';
import TransfersSection from '@/components/TransfersSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <PromoBar />
      <HeroSection />
      <WhySection />
      <PricingSection />
      <TransfersSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
