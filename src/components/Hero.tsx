import React from 'react';
import { Heart, Dog, MessageCircle } from 'lucide-react';
import PawsAndBonesBackground from './PawsAndBonesBackground';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center px-4 overflow-hidden">
      {/* Animated Background */}
      <PawsAndBonesBackground density={25} speed={0.8} iconSize={18} />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl">
        {/* Logo with Heart */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Heart className="w-24 h-24 text-red-500 fill-current" />
            <Dog className="w-12 h-12 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        
        {/* Brand Name */}
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4 font-rounded">
          Ruff Love Malaysia
        </h1>
        
        {/* Headline */}
        <h2 className="text-4xl font-bold text-red-500 mb-6 font-rounded">
          Find Your Forever Friend
        </h2>
        
        {/* Subtext */}
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Every adoption saves a life — give love, get love.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="#adopt" className="group bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-400 hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-pink-200 hover:shadow-xl relative overflow-hidden inline-block">
            <span className="relative z-10">Adopt Now</span>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              🐾
            </div>
          </a>
          
          <a href="#donate" className="group border-2 border-red-500 text-red-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-red-500 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 relative overflow-hidden inline-block">
            <span className="relative z-10">Donate</span>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              ❤️
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;