import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: "Recording",
      description: "Professional recording services with state-of-the-art equipment and acoustically treated spaces.",
      icon: "🎙️",
      link: "/services#recording"
    },
    {
      title: "Production",
      description: "Full production services from beat-making to arrangement and sound design.",
      icon: "🎛️",
      link: "/services#production"
    },
    {
      title: "Mixing",
      description: "Expert mixing to ensure your tracks sound balanced and professional on any system.",
      icon: "🎚️",
      link: "/services#mixing"
    },
    {
      title: "Mastering",
      description: "Final polish to make your music ready for commercial release across all platforms.",
      icon: "💿",
      link: "/services#mastering"
    }
  ];

  return (
    <section className="section-padding bg-black relative">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-fixed bg-center bg-cover opacity-20 parallax"
        style={{ /*backgroundImage: "url('/images/team.jpg')" */}}
      ></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-white mb-4">Our Services</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            From recording to release, we provide everything you need to bring your musical vision to life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="service-card group">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-white mb-2">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <Link 
                to={service.link} 
                className="flex items-center text-primary group-hover:text-white transition-colors"
              >
                Learn More <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/services" className="cta-button">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
