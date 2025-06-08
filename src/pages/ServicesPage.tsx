import CallToAction from '../components/layout/CallToAction';
import Services from '../components/layout/Services';
import LogoRibbon from '../components/layout/LogoRibbon';

// Builder.io compatible ServicesPage component
const ServicesPage = () => {
  return (
    <div data-builder-component="services-page">
      <div className="bg-black py-20" data-builder-block="page-header">
        <div className="container-custom">
          <h1 className="text-white text-center">Our Services</h1>
        </div>
      </div>

      <LogoRibbon />
      
      <Services data-builder-block="services-section" />
      
      <section className="section-padding bg-black relative" data-builder-block="detailed-services">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-fixed bg-center bg-cover opacity-20 parallax"
          style={{ backgroundImage: "url('/images/xero.jpg')" }}
          data-builder-block="background"
        ></div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-secondary p-8 rounded-lg shadow-white-sm" data-builder-block="service-detail">
              <h3 className="text-white mb-4">Recording</h3>
              <p className="text-gray-400 mb-6">
                Our recording services provide artists with access to professional-grade equipment in an acoustically treated environment. Whether you're recording vocals, instruments, or a full band, our studio delivers pristine sound quality.
              </p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Vocal booth with premium microphones</li>
                <li>• Live room for instrument recording</li>
                <li>• Multi-track recording capabilities</li>
                <li>• Professional monitoring environment</li>
              </ul>
              <div className="mt-6">
                <a href="/book" className="cta-button">Book Recording Session</a>
              </div>
            </div>
            
            <div className="bg-secondary p-8 rounded-lg shadow-white-sm" data-builder-block="service-detail">
              <h3 className="text-white mb-4">Production</h3>
              <p className="text-gray-400 mb-6">
                Our production services help artists develop their musical ideas into fully realized tracks. From beat-making to arrangement and sound design, our producers bring your vision to life.
              </p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Beat production and programming</li>
                <li>• Arrangement and composition</li>
                <li>• Sound design and synthesis</li>
                <li>• Session musician coordination</li>
              </ul>
              <div className="mt-6">
                <a href="/book" className="cta-button">Book Production Session</a>
              </div>
            </div>
            
            <div className="bg-secondary p-8 rounded-lg shadow-white-sm" data-builder-block="service-detail">
              <h3 className="text-white mb-4">Mixing</h3>
              <p className="text-gray-400 mb-6">
                Our mixing services ensure your tracks sound balanced and professional on any system. We bring clarity, depth, and impact to your music while preserving your artistic vision.
              </p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Detailed balance and EQ</li>
                <li>• Dynamic processing</li>
                <li>• Spatial effects and automation</li>
                <li>• Stem mixing options</li>
              </ul>
              <div className="mt-6">
                <a href="/book" className="cta-button">Book Mixing Session</a>
              </div>
            </div>
            
            <div className="bg-secondary p-8 rounded-lg shadow-white-sm" data-builder-block="service-detail">
              <h3 className="text-white mb-4">Mastering</h3>
              <p className="text-gray-400 mb-6">
                Our mastering services provide the final polish to make your music ready for commercial release across all platforms, ensuring consistent loudness and sonic quality.
              </p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Loudness optimization</li>
                <li>• Stereo enhancement</li>
                <li>• Final EQ and dynamics</li>
                <li>• Format preparation for distribution</li>
              </ul>
              <div className="mt-6">
                <a href="/book" className="cta-button">Book Mastering Session</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <CallToAction data-builder-block="cta-section" />
    </div>
  );
};

export default ServicesPage;
