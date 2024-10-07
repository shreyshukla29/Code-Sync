import HeroSection from "./../component/HeroSection";
import FeaturesSection from "./../component/FeatureSection";
import LiveDemoSection from "./../component/LiveDemoSection";
import FooterSection from "./../component/FooterSection";
import PricingSection from "./../component/PricingSection";
import Navbar from "./../component/Navbar";
const HomePage = () => {
  return (
    <>
      <Navbar />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="demo">
        <LiveDemoSection />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <FooterSection />
    </>
  );
};
export default HomePage;
