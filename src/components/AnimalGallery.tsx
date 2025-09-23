import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, MapPin } from 'lucide-react';
import { Button } from './ui/Button';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from './ui/Carousel';
import { cn } from '../utils/cn';

interface AnimalGalleryItem {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: string;
  location: string;
  description: string;
  image: string;
  isUrgent?: boolean;
  isFavorite?: boolean;
}

interface AnimalGalleryProps {
  heading?: string;
  description?: string;
  adoptionUrl?: string;
  animals?: AnimalGalleryItem[];
}

const AnimalGallery = ({
  heading = "Find Your Perfect Companion",
  description = "Browse through our adorable animals looking for their forever homes. Each one has a unique personality and is ready to bring joy to your family.",
  adoptionUrl = "/adopt",
  animals = [
    {
      id: "bella",
      name: "Bella",
      breed: "Golden Retriever Mix",
      age: "2 years",
      gender: "Female",
      location: "Kuala Lumpur",
      description: "Bella is a sweet and energetic dog who loves playing fetch and cuddling. She's great with kids and other pets.",
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      isUrgent: false,
      isFavorite: false,
    },
    {
      id: "max",
      name: "Max",
      breed: "Tabby Cat",
      age: "1 year",
      gender: "Male",
      location: "Petaling Jaya",
      description: "Max is a playful kitten who loves to chase toys and nap in sunny spots. He's looking for a loving family.",
      image: "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      isUrgent: true,
      isFavorite: false,
    },
    {
      id: "luna",
      name: "Luna",
      breed: "Border Collie",
      age: "3 years",
      gender: "Female",
      location: "Shah Alam",
      description: "Luna is an intelligent and loyal companion who loves outdoor adventures and learning new tricks.",
      image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      isUrgent: false,
      isFavorite: true,
    },
    {
      id: "charlie",
      name: "Charlie",
      breed: "Persian Cat",
      age: "4 years",
      gender: "Male",
      location: "Subang Jaya",
      description: "Charlie is a calm and affectionate cat who enjoys quiet moments and gentle pets. Perfect for a peaceful home.",
      image: "https://images.pexels.com/photos/1276553/pexels-photo-1276553.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      isUrgent: false,
      isFavorite: false,
    },
    {
      id: "rocky",
      name: "Rocky",
      breed: "German Shepherd",
      age: "5 years",
      gender: "Male",
      location: "Ampang",
      description: "Rocky is a protective and loving dog who would make an excellent family guardian and companion.",
      image: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      isUrgent: true,
      isFavorite: false,
    },
    {
      id: "mittens",
      name: "Mittens",
      breed: "Siamese Mix",
      age: "6 months",
      gender: "Female",
      location: "Mont Kiara",
      description: "Mittens is a curious and social kitten who loves to explore and play with other cats.",
      image: "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      isUrgent: false,
      isFavorite: true,
    },
  ],
}: AnimalGalleryProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  const toggleFavorite = (animalId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(animalId)) {
        newFavorites.delete(animalId);
      } else {
        newFavorites.add(animalId);
      }
      return newFavorites;
    });
  };

  return (
    <section id="adopt" className="py-16 bg-white">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 mb-8 md:mb-14 lg:mb-16">
        <div className="max-w-2xl">
          <h2 className="mb-3 text-3xl font-bold text-gray-800 md:mb-4 md:text-4xl lg:mb-6 lg:text-5xl font-rounded">
            {heading}
          </h2>
          <p className="text-gray-600 md:text-lg">
            {description}
          </p>
          <div className="flex justify-start mt-4">
            <div className="flex space-x-2">
              <span className="text-red-500">🐾</span>
              <span className="text-red-500">🐾</span>
              <span className="text-red-500">🐾</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gallery with Navigation Arrows */}
      <div className="relative w-full">
        {/* Left Arrow */}
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            carouselApi?.scrollPrev();
          }}
          disabled={!canScrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-gray-200 hover:bg-white hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>

        {/* Right Arrow */}
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            carouselApi?.scrollNext();
          }}
          disabled={!canScrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-gray-200 hover:bg-white hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowRight className="w-6 h-6" />
        </Button>

        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="w-full"
        >
          <CarouselContent className="ml-4 2xl:ml-[max(4rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {animals.map((animal) => (
              <CarouselItem key={animal.id} className="pl-4 md:max-w-[380px] lg:max-w-[420px]">
                <div className="group relative overflow-hidden rounded-2xl bg-white border border-pink-100 shadow-lg transition-all duration-300 hover:scale-105 h-[520px] flex flex-col">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                    <img
                      src={animal.image}
                      alt={`${animal.name} - ${animal.breed}`}
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110 rounded-t-2xl"
                    />
                    
                    {/* Urgent Badge */}
                    {animal.isUrgent && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Urgent
                      </div>
                    )}
                    
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(animal.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                    >
                      <Heart 
                        className={cn(
                          "w-4 h-4 transition-colors",
                          favorites.has(animal.id) || animal.isFavorite
                            ? "fill-red-500 text-red-500" 
                            : "text-gray-600 hover:text-red-500"
                        )} 
                      />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          {animal.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-medium">
                          {animal.breed}
                        </p>
                      </div>
                      <div className={`rounded-full px-3 py-1 text-xs font-medium ${
                        animal.gender === 'Male' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-pink-100 text-pink-800'
                      }`}>
                        {animal.age} • {animal.gender}
                      </div>
                    </div>
                    
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{animal.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-6 line-clamp-3 flex-1">
                      {animal.description}
                    </p>
                    
                    <div className="flex gap-3 mt-auto">
                      <Button 
                        className="flex-1 bg-red-500 hover:bg-red-400 text-white font-bold py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                        onClick={() => window.open(`${adoptionUrl}/${animal.id}`, '_blank')}
                      >
                        Adopt Me
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="rounded-full"
                        onClick={() => window.open(`${adoptionUrl}/${animal.id}`, '_blank')}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      
      <div className="text-center mt-12">
        <Button className="group bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-400 hover:scale-105 transition-all duration-300 hover:shadow-pink-200 hover:shadow-xl relative overflow-hidden">
          <span className="relative z-10">View All Pets</span>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            🐾
          </div>
        </Button>
      </div>
    </section>
  );
};

export default AnimalGallery;