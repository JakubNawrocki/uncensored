import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black py-4 sticky top-0 z-50 border-b border-border">
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/images/5.png" 
            alt="Uncensored Studios" 
            className="h-12 md:h-14"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-white hover:text-primary transition-colors">Home</Link>
          <Link to="/services" className="text-white hover:text-primary transition-colors">Services</Link>
          <Link to="/about" className="text-white hover:text-primary transition-colors">About</Link>
          <Link to="/book" className="text-white hover:text-primary transition-colors">Book Studio</Link>
          <Link to="/pricing" className="text-white hover:text-primary transition-colors">Pricing</Link>
          <a 
            href="https://uncensoredstudios.myshopify.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:text-primary transition-colors"
          >
            Merch
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-border mt-4">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/book" 
              className="text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Studio
            </Link>
            <Link 
              to="/pricing" 
              className="text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <a 
              href="https://uncensoredstudios.myshopify.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Merch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
