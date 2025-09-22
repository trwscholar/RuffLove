import React, { useEffect, useRef, useState } from 'react';
import { Heart, Clipboard, Home, HandHeart } from 'lucide-react';

const AdoptionProcess = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Complete animation after line draw duration
          setTimeout(() => setAnimationComplete(true), 1200);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

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
    <section ref={sectionRef} id="adoption-process" className="py-16 bg-pink-50 overflow-hidden">
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

        {/* Process Steps */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8 relative">
            {/* Connector Line Background */}
            <div className="absolute top-[88px] left-[10%] right-[10%] h-0.5 bg-pink-200" 
                 style={{ backgroundColor: '#FFE5E5' }} 
                 aria-hidden="true" />
            
            {/* Animated Connector Line */}
            <div 
              className="absolute top-[88px] left-[10%] h-0.5 bg-red-500 transition-all duration-1200 ease-out"
              style={{ 
                backgroundColor: '#E53935',
                width: isVisible ? '80%' : '0%'
              }}
              aria-hidden="true" 
            />

            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative flex flex-col items-center group cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-within:-translate-y-0.5 focus-within:shadow-lg bg-white border border-gray-200 rounded-lg shadow p-6"
                style={{ 
                  animationDelay: `${index * 120}ms`,
                  transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 300ms ease-out'
                }}
                tabIndex={0}
                role="button"
                aria-label={`Step ${step.step} of 4: ${step.title}`}
              >
                {/* Step Number Badge */}
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all duration-300 ease-out mb-4"
                  style={{ 
                    backgroundColor: (isVisible && index * 300 <= 1200) ? '#E53935' : '#FFE5E5',
                    color: (isVisible && index * 300 <= 1200) ? 'white' : '#E53935'
                  }}
                >
                  {step.step}
                </div>
                
                {/* Main Icon Circle */}
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg mb-4 transition-all duration-200 ease-out group-hover:scale-110"
                     style={{ backgroundColor: '#E53935' }}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Title */}
                <h3 
                  className="text-xl font-bold mb-2 font-rounded text-center transition-colors duration-300 ease-out"
                  style={{ 
                    color: (isVisible && index * 300 <= 1200) ? '#1F2937' : '#6B7280'
                  }}
                >
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-center leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative flex flex-col items-center group cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-within:-translate-y-0.5 focus-within:shadow-lg bg-white border border-gray-200 rounded-lg shadow p-6"
                style={{ 
                  animationDelay: `${index * 120}ms`,
                  transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 300ms ease-out'
                }}
                tabIndex={0}
                role="button"
                aria-label={`Step ${step.step} of 4: ${step.title}`}
              >
                {/* Step Number Badge */}
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all duration-300 ease-out mb-4"
                  style={{ 
                    backgroundColor: (isVisible && index * 300 <= 1200) ? '#E53935' : '#FFE5E5',
                    color: (isVisible && index * 300 <= 1200) ? 'white' : '#E53935'
                  }}
                >
                  {step.step}
                </div>
                
                {/* Main Icon Circle */}
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg mb-4 transition-all duration-200 ease-out group-hover:scale-110"
                     style={{ backgroundColor: '#E53935' }}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Title */}
                <h3 
                  className="text-xl font-bold mb-2 font-rounded text-center transition-colors duration-300 ease-out"
                  style={{ 
                    color: (isVisible && index * 300 <= 1200) ? '#1F2937' : '#6B7280'
                  }}
                >
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-center leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-8 relative">
            {/* Vertical Connector Line Background */}
            <div className="absolute left-1/2 top-[88px] bottom-[88px] w-0.5 bg-pink-200 transform -translate-x-1/2" 
                 style={{ backgroundColor: '#FFE5E5' }} 
                 aria-hidden="true" />
            
            {/* Animated Vertical Connector Line */}
            <div 
              className="absolute left-1/2 top-[88px] w-0.5 bg-red-500 transform -translate-x-1/2 transition-all duration-1200 ease-out"
              style={{ 
                backgroundColor: '#E53935',
                height: isVisible ? 'calc(100% - 176px)' : '0%'
              }}
              aria-hidden="true" 
            />

            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative flex flex-col items-center group cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-within:-translate-y-0.5 focus-within:shadow-lg bg-white border border-gray-200 rounded-lg shadow p-6"
                style={{ 
                  animationDelay: `${index * 120}ms`,
                  transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 300ms ease-out'
                }}
                tabIndex={0}
                role="button"
                aria-label={`Step ${step.step} of 4: ${step.title}`}
              >
                {/* Step Number Badge */}
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all duration-300 ease-out mb-4"
                  style={{ 
                    backgroundColor: (isVisible && index * 300 <= 1200) ? '#E53935' : '#FFE5E5',
                    color: (isVisible && index * 300 <= 1200) ? 'white' : '#E53935'
                  }}
                >
                  {step.step}
                </div>
                
                {/* Main Icon Circle */}
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg mb-4 transition-all duration-200 ease-out group-hover:scale-110"
                     style={{ backgroundColor: '#E53935' }}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Title */}
                <h3 
                  className="text-xl font-bold mb-2 font-rounded text-center transition-colors duration-300 ease-out"
                  style={{ 
                    color: (isVisible && index * 300 <= 1200) ? '#1F2937' : '#6B7280'
                  }}
                >
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-center leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
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