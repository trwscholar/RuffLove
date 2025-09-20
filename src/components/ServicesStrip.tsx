import React, { useEffect, useRef, useState } from 'react';
import { Dog, Cat, Heart, Calendar, HandHeart } from 'lucide-react';

const ServicesStrip = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDonationNote, setShowDonationNote] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Dog,
      label: 'Adopt a Dog',
      href: '#adopt',
      filter: 'dog',
      delay: '0ms'
    },
    {
      icon: Cat,
      label: 'Adopt a Cat',
      href: '#adopt',
      filter: 'cat',
      delay: '100ms'
    },
    {
      icon: Heart,
      label: 'How to Adopt',
      href: '#adoption-process',
      delay: '200ms'
    },
    {
      icon: Calendar,
      label: 'Events',
      href: '#events',
      delay: '300ms'
    },
    {
      icon: HandHeart,
      label: 'Volunteer or Donate',
      href: '#donate',
      delay: '400ms',
      special: true
    },
  ];

  const handleServiceClick = (service: typeof services[0]) => {
    if (service.special) {
      setShowDonationNote(true);
      setTimeout(() => setShowDonationNote(false), 4000);
    }
  };

  return (
    <section ref={sectionRef} className="py-12 bg-gradient-to-b from-white to-pink-25" style={{ backgroundColor: '#FFF6F6' }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 font-rounded">
            Ways We Help
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Quick links to adopt, donate, and get involved
          </p>
          
          {/* Paw Print Divider */}
          <div className="flex justify-center items-center">
            <div className="flex space-x-2">
              <span className="text-pink-300 text-sm">🐾</span>
              <span className="text-pink-300 text-sm">🐾</span>
              <span className="text-pink-300 text-sm">🐾</span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group cursor-pointer transition-all duration-250 ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: service.delay }}
              onClick={() => handleServiceClick(service)}
            >
              <a
                href={service.href}
                className="block text-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg p-2"
                aria-label={service.label}
                title={service.label}
              >
                {/* Icon Circle */}
                <div className="relative mb-3">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-pink-200 group-hover:shadow-xl group-active:scale-95 transition-all duration-200 mx-auto">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-pink-200 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-200 blur-sm"></div>
                </div>
                
                {/* Label */}
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-all duration-200 opacity-80 group-hover:opacity-100 max-w-20 mx-auto leading-tight">
                  {service.label}
                </p>
              </a>
            </div>
          ))}
        </div>

        {/* Donation Note */}
        {showDonationNote && (
          <div className="mt-8 text-center">
            <div className="inline-block bg-red-50 border border-red-200 rounded-full px-6 py-2 animate-fadeInUp">
              <p className="text-red-600 text-sm font-medium">
                💝 You can sponsor a pet too!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesStrip;