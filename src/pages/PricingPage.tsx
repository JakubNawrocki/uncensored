import Pricing from '../components/layout/Pricing';
import CallToAction from '../components/layout/CallToAction';

const PricingPage = () => {
  return (
    <div>
      <div className="bg-black py-20">
        <div className="container-custom">
          <h1 className="text-white text-center">Pricing</h1>
        </div>
      </div>
      
      <Pricing />
      <CallToAction />
    </div>
  );
};

export default PricingPage;
