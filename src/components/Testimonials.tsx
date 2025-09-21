import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Heart } from 'lucide-react';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Lim',
      petName: 'Buddy',
      quote: 'Adopting Buddy from Ruff Love Malaysia was the best decision ever! The team was so supportive throughout the process.',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300',
      location: 'Kuala Lumpur'
    },
    {
      id: 2,
      name: 'Ahmad Rahman',
      petName: 'Luna',
      quote: 'Luna has brought so much joy to our family. Thank you Ruff Love Malaysia for making this wonderful match!',
      image: 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=300',
      location: 'Petaling Jaya'
    },
    {
      id: 3,
      name: 'Michelle Wong',
      petName: 'Max',
      quote: 'The adoption process was smooth and the aftercare support is amazing. Max is now part of our family forever.',
      image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=300',
      location: 'Shah Alam'
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-rounded">
            Happy Tails Stories
          </h2>
          <p className="text-xl text-gray-600">
            Hear from families who found their perfect companions
          </p>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              <span className="text-red-500">❤️</span>
              <span className="text-red-500">❤️</span>
              <span className="text-red-500">❤️</span>
            </div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="bg-white rounded-3xl p-8 shadow-xl mx-4 relative">
                    <div className="absolute top-4 left-4">
                      <Quote className="w-8 h-8 text-red-200" />
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <img
                            src={testimonial.image}
                            alt={testimonial.petName}
                            className="w-32 h-32 rounded-full object-cover shadow-lg"
                          />
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <Heart className="w-4 h-4 text-white fill-current" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 text-center md:text-left">
                        <blockquote className="text-lg text-gray-700 mb-4 italic leading-relaxed">
                          "{testimonial.quote}"
                        </blockquote>
                        
                        <div>
                          <div className="font-bold text-gray-800 text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-red-500 font-medium">
                            Proud parent of {testimonial.petName}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:animate-pulse" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 group-hover:animate-pulse" />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-red-500' : 'bg-red-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;