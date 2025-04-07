
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-restaurant-700 font-serif">Swastik</span>
              <span className="ml-2 text-sm font-medium text-gray-600 hidden sm:block">Family Restaurant</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-800 hover:text-restaurant-500 font-medium transition duration-150">Home</Link>
            <Link to="/about" className="text-gray-800 hover:text-restaurant-500 font-medium transition duration-150">About</Link>
            <Link to="/menu" className="text-gray-800 hover:text-restaurant-500 font-medium transition duration-150">Menu</Link>
            <Link to="/gallery" className="text-gray-800 hover:text-restaurant-500 font-medium transition duration-150">Gallery</Link>
            <Link to="/contact" className="text-gray-800 hover:text-restaurant-500 font-medium transition duration-150">Contact</Link>
            <Button className="bg-restaurant-500 hover:bg-restaurant-600 text-white">
              <Link to="/contact?reserve=true">Reserve Table</Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 px-4 pt-2 pb-6 bg-white">
            <Link to="/" className="text-gray-800 hover:text-restaurant-500 font-medium" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className="text-gray-800 hover:text-restaurant-500 font-medium" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/menu" className="text-gray-800 hover:text-restaurant-500 font-medium" onClick={() => setIsOpen(false)}>Menu</Link>
            <Link to="/gallery" className="text-gray-800 hover:text-restaurant-500 font-medium" onClick={() => setIsOpen(false)}>Gallery</Link>
            <Link to="/contact" className="text-gray-800 hover:text-restaurant-500 font-medium" onClick={() => setIsOpen(false)}>Contact</Link>
            <Button className="bg-restaurant-500 hover:bg-restaurant-600 text-white w-full">
              <Link to="/contact?reserve=true" onClick={() => setIsOpen(false)}>Reserve Table</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
