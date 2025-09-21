import React, { useEffect, useRef, useState } from 'react';
import { Heart, Clipboard, Home, HandHeart } from 'lucide-react';

const AdoptionProcess = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
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
    <section 
      ref={sectionRef} 
      id="adoption-process" 
      className="relative py-16 bg-pink-50 overflow-visible"
    >
      {/* Mobile Vertical Connector Line */}
      <div 
        className="md:hidden absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-pink-200"
        style={{ backgroundColor: '#FAD9DF' }}
        aria-hidden="true"
      >
        {/* Animated fill for mobile */}
        <div 
          className="w-full bg-red-500 transition-all duration-900 ease-out origin-top"
          style={{ 
            backgroundColor: '#E53935',
            height: isVisible ? '100%' : '0%',
            transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'top'
          }}
        />
      </div>

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

        {/* Steps Container */}
        <div className="relative">
          {/* Desktop Horizontal Connector Line Background */}
          <div 
            className="hidden md:block absolute top-[88px] left-[10%] right-[10%] h-0.5 bg-pink-200" 
            style={{ backgroundColor: '#FFE5E5' }} 
            aria-hidden="true" 
          />
          
          {/* Desktop Animated Horizontal Connector Line */}
          <div 
            className="hidden md:block absolute top-[88px] left-[10%] h-0.5 bg-red-500 transition-all duration-1200 ease-out"
            style={{ 
              backgroundColor: '#E53935',
              width: isVisible ? '80%' : '0%'
            }}
            aria-hidden="true" 
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-8">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative flex flex-col items-center group cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-sm focus-within:-translate-y-0.5 focus-within:shadow-sm rounded-lg p-4 overflow-visible"
                style={{ 
                  animationDelay: `${index * 120}ms`,
                  transform: isVisible ? 'scale(1)' : 'scale(0.92)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 300ms ease-out'
                }}
                tabIndex={0}
                role="button"
                aria-label={`Step ${step.step} of 4: ${step.title}`}
              >
                {/* Step Number Badge */}
                <div 
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ease-out mb-4 relative z-10"
                  style={{ 
                    backgroundColor: (isVisible && index * 300 <= 1200) ? '#E53935' : '#FFE5E5',
                    color: (isVisible && index * 300 <= 1200) ? 'white' : '#E53935',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  {step.step}
                </div>
                
                {/* Main Icon Circle */}
                <button 
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-3 transition-all duration-200 ease-out group-hover:scale-110 relative z-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  style={{ 
                    backgroundColor: '#E53935',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    minWidth: '44px',
                    minHeight: '44px'
                  }}
                  aria-label={`${step.title} step`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </button>
                
                {/* Title */}
                <h3 
                  className="text-xl font-bold font-rounded text-center transition-colors duration-300 ease-out"
                  style={{ 
                    color: (isVisible && index * 300 <= 1200) ? '#1F2937' : '#6B7280',
                    marginTop: '12px'
                  }}
                >
                  {step.title}
                </h3>
                
                {/* Description */}
                <p 
                  className="text-gray-600 text-center leading-relaxed text-sm"
                  style={{ marginTop: '6px' }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <button 
            className="group bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-400 hover:scale-105 transition-all duration-300 hover:shadow-pink-200 hover:shadow-xl relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            style={{ 
              backgroundColor: '#E53935',
              minWidth: '44px',
              minHeight: '44px'
            }}
          >
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