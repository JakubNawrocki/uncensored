const CallToAction = () => {
  return (
    <section className="section-padding bg-primary relative">
      {/* Parallax Background with Overlay */}
      <div 
        className="absolute inset-0 bg-fixed bg-center bg-cover opacity-20 parallax"
        style={{ backgroundImage: "url('/images/team.jpg')" }}
      ></div>
      
      <div className="absolute inset-0 bg-primary bg-opacity-90"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-white mb-6">Ready to Create Your Next Hit?</h2>
            <p className="text-white text-opacity-90 mb-8 text-lg">
              Book your session today and experience the Uncensored Studios difference. 
              Professional quality without the industry gatekeeping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/book" className="cta-button bg-black text-white hover:bg-black/80 shadow-white-md">
                Book Studio
              </a>
              <a 
                href="https://uncensoredstudios.myshopify.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cta-button bg-white text-primary hover:bg-white/90 shadow-white-md"
              >
                Shop Merch
              </a>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-black p-6 rounded-lg shadow-white-md max-w-md">
              <img 
                src="/images/Untitled design (2).png" 
                alt="Uncensored Studios" 
                className="w-full h-auto"
              />
              <div className="text-center mt-4">
                <h3 className="text-white mb-2">Rep the Brand</h3>
                <p className="text-gray-400 mb-4">
                  Check out our exclusive merch collection. Quality apparel for the underground scene.
                </p>
                <a 
                  href="https://uncensoredstudios.myshopify.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:text-white transition-colors"
                >
                  Visit Merch Store →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
