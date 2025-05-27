const WhyUncensored = () => {
  const reasons = [
    {
      title: "No Gatekeeping",
      description: "We believe in open access to professional recording. No industry politics, no barriers—just great sound for everyone."
    },
    {
      title: "East London Authenticity",
      description: "Born from the underground scene, we bring raw authenticity to every project while maintaining professional standards."
    },
    {
      title: "Artist-First Approach",
      description: "Your vision is our priority. We're here to enhance your sound, not change it."
    },
    {
      title: "Technical Excellence",
      description: "Premium equipment and acoustically treated spaces ensure your recordings sound professional every time."
    }
  ];

  return (
    <section className="section-padding bg-black relative">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-fixed bg-center bg-cover opacity-20 parallax"
        style={{ backgroundImage: "url('/images/guys.avif')" }}
      ></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-white mb-4">Why Uncensored Studios</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            We're not just another recording studio. We're changing how artists access professional recording.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-secondary p-6 rounded-lg shadow-white-sm">
              <h3 className="text-white mb-3">{reason.title}</h3>
              <p className="text-gray-400">{reason.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="bg-secondary p-8 rounded-lg shadow-white-md max-w-2xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <img 
                  src="/images/16.png" 
                  alt="Uncensored Studios Logo" 
                  className="w-32 h-32 object-contain"
                />
              </div>
              <div>
                <h3 className="text-white mb-3">Ready to Level Up Your Sound?</h3>
                <p className="text-gray-400 mb-4">
                  Book your session today and experience the difference of working with a studio that puts artists first. No gatekeeping, no industry politics—just professional results.
                </p>
                <a href="/book" className="cta-button inline-block">Book Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUncensored;
