import Hero from '../components/layout/Hero';
import Services from '../components/layout/Services';
import WhyUncensored from '../components/layout/WhyUncensored';
import SpotifyPlayer from '../components/layout/SpotifyPlayer';
import CallToAction from '../components/layout/CallToAction';

// Builder.io compatible HomePage component
const HomePage = () => {
  return (
    <div data-builder-component="home-page">
      {/* Hero Section with Video Background */}
      <Hero data-builder-block="hero-section" />
      
      {/* Services Section */}
      <Services data-builder-block="services-section" />
      
      {/* Why Choose Us Section */}
      <WhyUncensored data-builder-block="why-section" />
      
      {/* Spotify Player Section */}
      <SpotifyPlayer data-builder-block="spotify-section" />
      
      {/* Call to Action Section */}
      <CallToAction data-builder-block="cta-section" />
    </div>
  );
};

export default HomePage;
