import { useState } from 'react';

interface PricingPlanProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

const PricingPlan = ({ title, price, period, features, popular = false }: PricingPlanProps) => {
  return (
    <div className={`bg-secondary rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 ${popular ? 'border-2 border-primary shadow-white-md' : 'shadow-white-sm'}`}>
      {popular && (
        <div className="bg-primary py-2 text-center">
          <span className="text-white font-bold text-sm">MOST POPULAR</span>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-white text-xl font-bold mb-4">{title}</h3>
        <div className="mb-4">
          <span className="text-white text-4xl font-bold">{price}</span>
          <span className="text-gray-400 ml-2">{period}</span>
        </div>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="text-gray-300 flex items-start">
              <span className="text-primary mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        
        <button className={`w-full py-3 rounded-md font-bold transition-colors ${popular ? 'bg-primary text-white shadow-white-sm' : 'bg-black text-white border border-primary hover:bg-primary'}`}>
          Select Plan
        </button>
      </div>
    </div>
  );
};

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  
  const pricingPlans = [
    {
      title: "Dry Hire",
      price: isMonthly ? "£60" : "£350",
      period: isMonthly ? "per hour" : "full day",
      features: [
        "Access to main control room and booth",
        "Use of studio equipment",
        "Pro Tools or Logic Pro X",
        "Minimum 2-hour booking",
        "Basic technical support"
      ]
    },
    {
      title: "Producer Package",
      price: isMonthly ? "£85" : "£500",
      period: isMonthly ? "per hour" : "full day",
      features: [
        "Everything in Dry Hire",
        "Professional engineer",
        "Beat production",
        "Vocal recording",
        "Basic mixing",
        "Unlimited revisions during session"
      ],
      popular: true
    },
    {
      title: "Premium Package",
      price: isMonthly ? "£120" : "£700",
      period: isMonthly ? "per hour" : "full day",
      features: [
        "Everything in Producer Package",
        "Advanced mixing & mastering",
        "2 revision sessions included",
        "Promotional content recording",
        "Distribution guidance",
        "Priority booking"
      ]
    }
  ];

  return (
    <section className="section-padding bg-black relative">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-fixed bg-center bg-cover opacity-20 parallax"
        style={{ /*backgroundImage: "url('/images/xero.jpg')" */}}
      ></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-white mb-4">Pricing Plans</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Transparent pricing with no hidden fees. Choose the plan that works for your project and budget.
          </p>
          
          <div className="flex justify-center mt-8">
            <div className="bg-secondary inline-flex p-1 rounded-md shadow-white-sm">
              <button
                className={`px-4 py-2 rounded ${isMonthly ? 'bg-primary text-white' : 'text-gray-400'}`}
                onClick={() => setIsMonthly(true)}
              >
                Hourly
              </button>
              <button
                className={`px-4 py-2 rounded ${!isMonthly ? 'bg-primary text-white' : 'text-gray-400'}`}
                onClick={() => setIsMonthly(false)}
              >
                Full Day
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingPlan
              key={index}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              popular={plan.popular}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="bg-secondary p-6 rounded-lg inline-block shadow-white-md">
            <h3 className="text-white mb-3">Need a Custom Package?</h3>
            <p className="text-gray-400 mb-4">
              Contact us for custom pricing tailored to your specific project requirements.
            </p>
            <a href="/book" className="cta-button inline-block">Contact Us</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
