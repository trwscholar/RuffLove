import React from 'react';
import { Heart, Clipboard, Home, HandHeart } from 'lucide-react';

const AdoptionProcess = () => {
  const steps = [
    {
      icon: Heart,
      title: 'Choose Pet',
      description: 'Browse our available pets and find your perfect match',
      step: 1,
    },
    {
      icon: Clipboard,
      title: 'Apply',
      description: 'Fill out our simple adoption application form',
      step: 2,
    },
    {
      icon: Home,
      title: 'Meet & Greet',
      description: 'Visit our center to meet your chosen pet',
      step: 3,
    },
    {
      icon: HandHeart,
      title: 'Bring Home',
      description: 'Complete the adoption and welcome your new family member',
      step: 4,
    },
  ];

  return (
    <section id="adoption-process" className="py-16 bg-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-rounded">
            Simple Adoption Process
          </h2>
          <p className="text-xl text-gray-600">
            Just 4 easy steps to bring your new best friend home
          </p>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              <span className="text-red-500">🐾</span>
              <span className="text-red-500">🐾</span>
              <span className="text-red-500">🐾</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="text-center group animate-fadeInUp"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative mb-6">
                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                  {step.step}
                </div>
                
                {/* Icon Circle */}
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:animate-bounce transition-all duration-300 mx-auto">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-rounded">
                {step.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
              
              {/* Connector Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-red-200 transform translate-x-4" 
                     style={{ width: 'calc(100% - 2rem)' }} />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="group bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-400 hover:scale-105 transition-all duration-300 hover:shadow-pink-200 hover:shadow-xl relative overflow-hidden">
            <span className="relative z-10">Start Adoption Process</span>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              🐾
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdoptionProcess;