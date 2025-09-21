import React from 'react';
import { Heart, Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white py-12 relative">
      {/* Clean separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-pink-100" style={{ backgroundColor: '#FBE7EA' }}></div>
      <div className="h-6"></div>
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Heart className="w-8 h-8 text-red-500 fill-current mr-3" />
              <h3 className="text-2xl font-bold text-gray-800 font-rounded">
                Ruff Love Malaysia
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              We're dedicated to rescuing, rehabilitating, and rehoming animals in need. 
              Every adoption saves a life and creates space for us to help another animal.
            </p>
            <div className="flex items-center text-gray-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-500 fill-current animate-pulse" />
              <span>by Ruff Love Malaysia</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4 font-rounded">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#adopt" className="text-gray-600 hover:text-red-500 transition-colors duration-300">
                  Adopt
                </a>
              </li>
              <li>
                <a href="#donate" className="text-gray-600 hover:text-red-500 transition-colors duration-300">
                  Donate
                </a>
              </li>
              <li>
                <a href="#events" className="text-gray-600 hover:text-red-500 transition-colors duration-300">
                  Events
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-red-500 transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4 font-rounded">
              Follow Us
            </h4>
            <div className="flex space-x-3">
              <button className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-400 hover:scale-110 transition-all duration-300 group">
                <Facebook className="w-5 h-5 group-hover:animate-pulse" />
              </button>
              <button className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-400 hover:scale-110 transition-all duration-300 group">
                <Instagram className="w-5 h-5 group-hover:animate-pulse" />
              </button>
              <button className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-400 hover:scale-110 transition-all duration-300 group">
                <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
              </button>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">Get updates:</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
                <button className="bg-red-500 text-white px-4 py-2 rounded-r-full hover:bg-red-400 transition-colors duration-300">
                  📧
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2024 Ruff Love Malaysia. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-red-500 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-red-500 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-red-500 transition-colors duration-300">
                Adoption Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;