import AboutSection from '../components/layout/AboutSection';
import CallToAction from '../components/layout/CallToAction';
import LogoRibbon from '../components/layout/LogoRibbon';

// Builder.io compatible AboutPage component
const AboutPage = () => {
  return (
    <div data-builder-component="about-page">
      <div className="bg-black py-20" data-builder-block="page-header">
        <div className="container-custom">
          <h1 className="text-white text-center">About Us</h1>
        </div>
      </div>
      <LogoRibbon />
      
      <AboutSection data-builder-block="about-section" />
      <CallToAction data-builder-block="cta-section" />
    </div>
  );
};

export default AboutPage;
