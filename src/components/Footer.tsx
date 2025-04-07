
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Restaurant Info */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Swastik Family Restaurant</h3>
            <p className="mb-4 text-gray-300">Your destination for delicious memories with family and friends.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-restaurant-500 transition">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-restaurant-500 transition">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-restaurant-500 transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-restaurant-500 transition">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-restaurant-500 transition">About Us</Link></li>
              <li><Link to="/menu" className="text-gray-300 hover:text-restaurant-500 transition">Menu</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-restaurant-500 transition">Gallery</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-restaurant-500 transition">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-restaurant-500" />
                <span className="text-gray-300">123 Restaurant Street, Foodville, FD 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-restaurant-500" />
                <span className="text-gray-300">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-restaurant-500" />
                <span className="text-gray-300">info@swastikrestaurant.com</span>
              </li>
            </ul>
          </div>
          
          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Clock size={18} className="mr-2 mt-1 text-restaurant-500" />
                <div>
                  <p className="text-gray-300">Monday - Friday</p>
                  <p className="text-gray-400">11:00 AM - 10:00 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="mr-2 mt-1 text-restaurant-500" />
                <div>
                  <p className="text-gray-300">Saturday - Sunday</p>
                  <p className="text-gray-400">10:00 AM - 11:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Swastik Family Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
