// Builder.io compatible component structure
// This component is designed to be easily configurable in Builder.io
const AboutSection = () => {
  // These would be configurable in Builder.io
  const title = "About Uncensored Studios";
  const subtitle = "East London's Premier Underground Recording Studio";
  const description = "Founded with a mission to break down the barriers of the music industry, Uncensored Studios provides professional recording services without the gatekeeping. We're part of XPM Group recording studio in East London, bringing authentic sound to artists of all levels.";
  const teamImageSrc = "/images/team.jpg";
  const artistImage1Src = "/images/mlodyav.jpg";
  const artistImage2Src = "/images/xero.jpg";
  
  return (
    <section className="section-padding bg-black relative" data-builder-component="about-section">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-fixed bg-center bg-cover opacity-20 parallax"
        style={{ /*backgroundImage: "url('/images/guys.avif')" */}}
        data-builder-block="background"
      ></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12" data-builder-block="header">
          <h2 className="text-white mb-4" data-builder-text="title">{title}</h2>
          <p className="text-gray-400 max-w-3xl mx-auto" data-builder-text="subtitle">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div data-builder-block="main-content">
            <p className="text-gray-300 mb-6 text-lg" data-builder-text="description">
              {description}
            </p>
            <div className="bg-secondary p-6 rounded-lg shadow-white-sm mb-6" data-builder-block="mission-statement">
              <h3 className="text-white mb-3">Our Mission</h3>
              <p className="text-gray-400">
                To provide professional recording services without the industry gatekeeping, empowering artists to create authentic music on their own terms.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4" data-builder-block="cta-buttons">
              <a href="/book" className="cta-button" data-builder-button="primary">
                Book a Session
              </a>
              <a href="/services" className="cta-button bg-transparent border-2 border-white hover:bg-white hover:text-black" data-builder-button="secondary">
                Our Services
              </a>
            </div>
          </div>
          
          <div className="relative" data-builder-block="main-image">
            <img 
              src={teamImageSrc} 
              alt="Uncensored Studios Team" 
              className="rounded-lg shadow-white-md w-full h-auto"
              data-builder-image="team"
            />
            <div className="absolute -bottom-4 -right-4 bg-primary text-white p-2 rounded shadow-white-sm" data-builder-block="image-badge">
              XPM Group
            </div>
          </div>
        </div>
        
        <div className="mt-16" data-builder-block="artists-section">
          <h3 className="text-white text-center mb-8">Artists We've Worked With</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-secondary rounded-lg overflow-hidden shadow-white-sm" data-builder-block="artist-card-1">
              <img 
                src={artistImage1Src} 
                alt="Artist" 
                className="w-full h-64 object-cover"
                data-builder-image="artist-1"
              />
              <div className="p-6">
                <h4 className="text-white mb-2">Underground Talent</h4>
                <p className="text-gray-400">
                  We work with emerging artists from across the UK, helping them develop their sound and reach new audiences.
                </p>
              </div>
            </div>
            
            <div className="bg-secondary rounded-lg overflow-hidden shadow-white-sm" data-builder-block="artist-card-2">
              <img 
                src={artistImage2Src} 
                alt="Artist" 
                className="w-full h-64 object-cover"
                data-builder-image="artist-2"
              />
              <div className="p-6">
                <h4 className="text-white mb-2">Established Acts</h4>
                <p className="text-gray-400">
                  Our studio has hosted established artists looking for an authentic sound and creative freedom.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
