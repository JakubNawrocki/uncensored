import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Desktop Video */}
      <video 
        className="absolute w-full h-full object-cover hidden md:block"
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="/images/8118111-uhd_3840_2160_24fps.mp4" type="video/mp4" />
      </video>
      
      {/* Mobile Video */}
      <video 
        className="absolute w-full h-full object-cover md:hidden"
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="/images/8114941-uhd_2160_3840_24fps.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      
      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <img 
          src="/images/5.png" 
          alt="Uncensored Studios Logo" 
          className="mx-auto mb-8 w-48 md:w-64 shadow-white-md"
        />
        <h1 className="text-white mb-6">The Sound of the Underground.</h1>
        <p className="text-gray-300 text-xl mb-8 max-w-3xl mx-auto">
          Premium Recording and Production Studio in East London.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/book" className="cta-button">Book Studio</Link>
          <Link to="/services" className="cta-button bg-transparent border-2 border-white hover:bg-white hover:text-black">
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
