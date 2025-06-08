import Pricing from '../components/layout/Pricing';
import CallToAction from '../components/layout/CallToAction';
import LogoRibbon from '../components/layout/LogoRibbon';

const PricingPage = () => {
  return (
    <div>
      <div className="bg-black py-20">
        <div className="container-custom">
          <h1 className="text-white text-center">Pricing</h1>
        </div>
      </div>

      <LogoRibbon />
      
      <Pricing />
      <CallToAction />
    </div>
  );
};

export default PricingPage;
