import { Instagram, Mail, Phone, ShoppingBag } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-border py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <img 
                src="/images/Uncensored Studios Transparent .png" 
                alt="Uncensored Studios" 
                className="h-16"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Premium Recording and Production Studio in East London.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/uncensored.studioss/" className="text-white hover:text-primary transition-colors">
                <Instagram size={24} />
              </a>
              <a href="mailto:info@uncensoredstudios.com" className="text-white hover:text-primary transition-colors">
                <Mail size={24} />
              </a>
              <a href="tel:+4407985121414" className="text-white hover:text-primary transition-colors">
                <Phone size={24} />
              </a>
              <a href="https://uncensoredstudios.myshopify.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                <ShoppingBag size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-primary transition-colors">Home</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-primary transition-colors">Services</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-primary transition-colors">About</a></li>
              <li><a href="/book" className="text-gray-400 hover:text-primary transition-colors">Book Studio</a></li>
              <li><a href="/pricing" className="text-gray-400 hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="https://uncensoredstudios.myshopify.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">Merch Store</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Studio Hours</h4>
            <ul className="text-gray-400 space-y-2">
              <li>Monday - Friday: 10am - 10pm</li>
              <li>Saturday: 12pm - 10pm</li>
              <li>Sunday: 12pm - 8pm</li>
            </ul>
            <p className="text-gray-400 mt-4">
              Part of XPM Group
            </p>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Uncensored Studios. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
