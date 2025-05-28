import { useState } from 'react';

interface PricingPlanProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  highlight?: string;
}

const PricingPlan = ({ title, price, period, features, popular = false, highlight }: PricingPlanProps) => {
  return (
    <div className={`bg-secondary rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 ${popular ? 'border-2 border-primary shadow-white-md' : 'shadow-white-sm'} flex flex-col h-full`}>
      {popular && (
        <div className="bg-primary py-2 text-center">
          <span className="text-white font-bold text-sm">MOST POPULAR</span>
        </div>
      )}
      {highlight && (
        <div className="bg-primary py-2 text-center">
          <span className="text-white font-bold text-sm">{highlight}</span>
        </div>
      )}
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-white text-xl font-bold mb-4">{title}</h3>
        <div className="mb-6">
          <span className="text-white text-4xl font-bold">{price}</span>
          <span className="text-gray-400 ml-2">{period}</span>
        </div>
        
        <ul className="space-y-3 mb-6 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="text-gray-300 flex items-start">
              <span className="text-primary mr-2 mt-1">✓</span>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button className={`w-full py-3 rounded-md font-bold transition-colors ${popular ? 'bg-primary text-white shadow-white-sm' : 'bg-black text-white border border-primary hover:bg-primary'}`}>
          Book Now
        </button>
      </div>
    </div>
  );
};

const MembershipCard = ({ title, price, benefits, highlight }: { title: string; price: string; benefits: string[]; highlight?: boolean }) => {
  return (
    <div className={`bg-secondary rounded-lg p-6 ${highlight ? 'border-2 border-primary shadow-white-md' : 'shadow-white-sm'} hover:-translate-y-1 transition-all duration-300 flex flex-col h-full`}>
      <h4 className="text-white text-lg font-bold mb-2">{title}</h4>
      <p className="text-primary text-2xl font-bold mb-4">{price}/month</p>
      <ul className="space-y-2 flex-grow">
        {benefits.map((benefit, index) => (
          <li key={index} className="text-gray-300 text-sm flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('studio');
  
  const tabs = [
    { id: 'studio', label: 'Studio Time' },
    { id: 'bundles', label: 'Bundle Packages' },
    { id: 'production', label: 'Production Services' },
    { id: 'memberships', label: 'Memberships' }
  ];

  const studioRates = [
    {
      title: "Dry Hire",
      price: "£20",
      period: "per hour",
      features: [
        "No engineer provided",
        "Access to all studio equipment",
        "Pro Tools & Logic Pro X",
        "Minimum 2-hour booking",
        "Full day rate: £150 (8 hours)"
      ]
    },
    {
      title: "Recording Hire",
      price: "£40",
      period: "per hour",
      features: [
        "Professional engineer included",
        "Expert recording assistance",
        "Minimum 2-hour booking",
        "4-7 hours: £35/hour",
        "Full day: £220 (8 hours)"
      ],
      popular: true
    },
    {
      title: "DJ Practice",
      price: "£20",
      period: "per hour",
      features: [
        "DJ equipment access",
        "Pioneer CDJs & mixer",
        "Minimum 2-hour booking",
        "Full day rate: £150 (8 hours)",
        "Perfect for mix preparation"
      ]
    }
  ];

  const hourBundles = [
    {
      title: "10 Hour Bundle",
      price: "£170",
      period: "save £30",
      features: [
        "Use for any dry hire or DJ sessions",
        "Valid for 3 months",
        "Share with band members",
        "Priority booking"
      ]
    },
    {
      title: "20 Hour Bundle",
      price: "£320",
      period: "save £80",
      features: [
        "Use for any dry hire or DJ sessions",
        "Valid for 6 months",
        "Share with band members",
        "Priority booking",
        "Free studio tour"
      ]
    },
    {
      title: "40 Hour Bundle",
      price: "£600",
      period: "save £200",
      features: [
        "Use for any dry hire or DJ sessions",
        "Valid for 12 months",
        "Share with band members",
        "Priority booking",
        "Free merch pack"
      ]
    }
  ];

  const bundlePackages = [
    {
      title: "Artist Essentials",
      price: "£250",
      period: "save £65",
      features: [
        "3 hours studio time",
        "1 track mixed & mastered",
        "1-hour creative consultation",
        "Free Uncensored Studios T-shirt",
        "Perfect for singles"
      ]
    },
    {
      title: "Breakthrough Package",
      price: "£450",
      period: "save £130",
      features: [
        "5 hours studio time",
        "2 tracks mixed & mastered",
        "1 custom beat production",
        "30-minute marketing strategy session",
        "Free T-shirt & Snapback Cap"
      ],
      popular: true
    },
    {
      title: "Album Starter",
      price: "£900",
      period: "save £300",
      features: [
        "10 hours studio time",
        "4 tracks mixed & mastered",
        "1 custom beat production",
        "60-minute branding session",
        "Promo studio photoshoot",
        "Free full merch pack"
      ]
    },
    {
      title: "Gold Tier",
      price: "£1,500",
      period: "per month",
      features: [
        "Unlimited studio time (pre-booked)",
        "6 tracks mixed & mastered monthly",
        "2 custom beats per month",
        "Bi-weekly consulting sessions",
        "Monthly photoshoot & video content",
        "Featured on studio socials",
        "Full merch bundle included"
      ],
      highlight: "SAVE £700+ MONTHLY"
    }
  ];

  const productionServices = [
    {
      title: "Mixing",
      price: "£100",
      period: "per track",
      features: [
        "Professional mixing",
        "Unlimited revisions",
        "Stem delivery included",
        "48-hour turnaround",
        "£80 if booked with studio time"
      ]
    },
    {
      title: "Mastering",
      price: "£50",
      period: "per track",
      features: [
        "Industry-standard mastering",
        "Multiple format delivery",
        "Streaming optimized",
        "24-hour turnaround",
        "£40 if booked with studio time"
      ]
    },
    {
      title: "Mix & Master Bundle",
      price: "£140",
      period: "per track",
      features: [
        "Complete post-production",
        "Save £10 on combined service",
        "Priority turnaround",
        "Radio-ready quality",
        "£120 if booked with studio time"
      ],
      popular: true
    },
    {
      title: "Custom Beats",
      price: "£150+",
      period: "starting price",
      features: [
        "Exclusive or lease options",
        "Genre-specific production",
        "Stems included",
        "Publishing splits negotiable",
        "Prices vary by exclusivity"
      ]
    }
  ];

  const memberships = [
    { 
      title: "Producer Member", 
      price: "£25", 
      benefits: [
        "10% discount on all dry hire sessions",
        "2 guest-list tickets monthly to Uncensored events",
        "10% merchandise discount",
        "25% discount on masterclasses"
      ]
    },
    { 
      title: "Artist Member", 
      price: "£25", 
      benefits: [
        "10% discount on all recording hire sessions",
        "2 guest-list tickets monthly to Uncensored events",
        "10% merchandise discount",
        "25% discount on masterclasses"
      ]
    },
    { 
      title: "Producer-Artist Member", 
      price: "£50", 
      benefits: [
        "10% discount on ALL studio sessions",
        "4 guest-list tickets monthly",
        "20% merchandise discount",
        "30% discount on masterclasses"
      ],
      highlight: true
    },
    { 
      title: "WRLDWDE Producer", 
      price: "£35", 
      benefits: [
        "15% discount at ALL Uncensored Studios locations",
        "4 guest-list tickets monthly",
        "Access to WRLDWDE community",
        "50% discount on masterclasses"
      ]
    },
    { 
      title: "WRLDWDE Artist", 
      price: "£35", 
      benefits: [
        "15% discount on recording at ALL locations",
        "4 guest-list tickets monthly",
        "Access to WRLDWDE community",
        "50% discount on masterclasses"
      ]
    },
    { 
      title: "WRLDWDE Producer-Artist", 
      price: "£60", 
      benefits: [
        "15% discount on ALL sessions at ALL locations",
        "10 guest-list tickets monthly",
        "Access to WRLDWDE community",
        "60% discount on masterclasses"
      ]
    }
  ];

  return (
    <section className="section-padding bg-black relative">
      {/* Simple parallax background */}
      <div 
        className="absolute inset-0 bg-fixed bg-center bg-cover opacity-20 parallax"
        style={{ backgroundImage: "url('/images/studio-bg.jpg')" }}
      ></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-white mb-4">Transparent Pricing</h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            No hidden fees. Just pure value. Choose what works for your project and budget.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-md font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-white-sm'
                  : 'bg-secondary text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Studio Time Tab */}
        {activeTab === 'studio' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {studioRates.map((plan, index) => (
                <PricingPlan key={index} {...plan} />
              ))}
            </div>
            
            <div className="mt-12">
              <h3 className="text-white text-2xl font-bold mb-6 text-center">Hour Bundles - Save More!</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hourBundles.map((bundle, index) => (
                  <PricingPlan key={index} {...bundle} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bundle Packages Tab */}
        {activeTab === 'bundles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bundlePackages.map((plan, index) => (
              <PricingPlan key={index} {...plan} />
            ))}
          </div>
        )}

        {/* Production Services Tab */}
        {activeTab === 'production' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productionServices.map((service, index) => (
              <PricingPlan key={index} {...service} />
            ))}
          </div>
        )}

        {/* Memberships Tab */}
        {activeTab === 'memberships' && (
          <div>
            <div className="text-center mb-8">
              <p className="text-gray-400">Join our community and unlock exclusive benefits!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memberships.map((membership, index) => (
                <MembershipCard key={index} {...membership} />
              ))}
            </div>
          </div>
        )}

        {/* Special Offers Section */}
        <div className="mt-16 text-center">
          <div className="bg-secondary p-8 rounded-lg shadow-white-md max-w-2xl mx-auto">
            <h3 className="text-white mb-6">🎉 SPECIAL OFFERS</h3>
            <div className="space-y-4 text-gray-300 mb-6">
              <p className="flex items-center justify-center">
                <span className="mr-2">✨</span>
                First-time clients: <span className="text-white font-bold ml-2">£50 OFF</span> any bundle package!
              </p>
              <p className="flex items-center justify-center">
                <span className="mr-2">🤝</span>
                Referral Program: Bring a friend, both get <span className="text-white font-bold ml-2">£25 off</span>
              </p>
              <p className="text-sm">
                Add-ons available: Extra mix/master (£80), Music video (£25), Extended photoshoot (£150)
              </p>
            </div>
            <a href="/book" className="cta-button inline-block">
              Book Your Session
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;