import React, { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Heart, MapPin } from 'lucide-react';
import { Button } from './ui/Button';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from './ui/Carousel';
import { cn } from '../utils/cn';
import supabase from '../supabase-client';

interface AnimalGalleryItem {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: string;
  location: string;
  description: string;
  image_url: string;
  isUrgent?: boolean;
  isFavorite?: boolean;
}

interface AnimalGalleryProps {
  heading?: string;
  description?: string;
  adoptionUrl?: string;
}

const AnimalGallery = ({
  heading = "Find Your Perfect Companion",
  description = "Browse through our adorable animals looking for their forever homes. Each one has a unique personality and is ready to bring joy to your family.",
  adoptionUrl = "/adopt",
}: AnimalGalleryProps) => {
  const [animals, setAnimals] = useState<AnimalGalleryItem[]>([]);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from('Gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching gallery:', error);
      return;
    }

    const mappedAnimals: AnimalGalleryItem[] = (data || []).map((item) => ({
      id: item.id,
      name: item.name,
      breed: item.breed,
      age: `${item.age} years`,
      gender: item.gender,
      location: item.location,
      description: item.description,
      image_url: item.image_url,
      isUrgent: item.isUrgent,
      isFavorite: false,
    }));

    setAnimals(mappedAnimals);
  };

  const updateScrollButtons = useCallback(() => {
    if (!carouselApi) return;
    
    setCanScrollPrev(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());
  }, [carouselApi]);

  const handleScrollPrev = useCallback(() => {
    if (carouselApi) {
      carouselApi.scrollPrev();
    }
  }, [carouselApi]);

  const handleScrollNext = useCallback(() => {
    if (carouselApi) {
      carouselApi.scrollNext();
    }
  }, [carouselApi]);

  useEffect(() => {
    fetchGallery();
  }, []);

  // Initialize carousel API and set up event listeners
  useEffect(() => {
    if (!carouselApi) return;

    // Initial button state update
    updateScrollButtons();

    // Set up event listeners
    const handleSelect = () => updateScrollButtons();
    const handleResize = () => updateScrollButtons();
    
    carouselApi.on('select', handleSelect);
    carouselApi.on('resize', handleResize);
    carouselApi.on('reInit', handleSelect);

    // Cleanup
    return () => {
      carouselApi.off('select', handleSelect);
      carouselApi.off('resize', handleResize);
      carouselApi.off('reInit', handleSelect);
    };
  }, [carouselApi, updateScrollButtons]);

  // Update button states when animals change
  useEffect(() => {
    if (carouselApi && animals.length > 0) {
      // Small delay to ensure carousel has rendered the new content
      setTimeout(() => {
        updateScrollButtons();
      }, 100);
    }
  }, [animals, carouselApi, updateScrollButtons]);

  const toggleFavorite = (animalId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(animalId)) newFavorites.delete(animalId);
      else newFavorites.add(animalId);
      return newFavorites;
    });
  };

  return (
    <section id="adopt" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 mb-8 md:mb-14 lg:mb-16 text-center">
        <h2 className="mb-3 text-3xl font-bold text-gray-800 md:mb-4 md:text-4xl lg:mb-6 lg:text-5xl font-rounded">
          {heading}
        </h2>
        <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">{description}</p>
        <div className="flex justify-center mt-4 space-x-2 text-red-500">🐾🐾🐾</div>
      </div>

      <div className="relative w-full">
        <Button
          size="icon"
          variant="outline"
          onClick={handleScrollPrev}
          disabled={!canScrollPrev || !carouselApi}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-gray-200 hover:bg-white hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous animals"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={handleScrollNext}
          disabled={!canScrollNext || !carouselApi}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-gray-200 hover:bg-white hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next animals"
        >
          <ArrowRight className="w-6 h-6" />
        </Button>

        <Carousel
  setApi={setCarouselApi}
  opts={{ 
    breakpoints: { "(max-width: 768px)": { dragFree: true } },
    loop: false,
    align: "start"
  }}
  className="w-full"
>
  <CarouselContent className="ml-4 2xl:ml-[max(4rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))] py-8">
    {animals.map((animal) => (
      <CarouselItem key={animal.id} className="pl-4 md:max-w-[320px] lg:max-w-[360px]">
        <div className="group relative overflow-hidden rounded-2xl bg-white border border-pink-100 shadow-lg transition-all duration-300 hover:scale-105 h-[440px] flex flex-col">
          
          {/* IMAGE CONTAINER WITH ASPECT RATIO */}
          <div className="relative w-full overflow-hidden rounded-t-2xl flex-shrink-0 aspect-[16/9]">
            <img
              src={animal.image_url}
              alt={`${animal.name} - ${animal.breed}`}
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
            />
            {animal.isUrgent && (
              <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                Urgent
              </div>
            )}
            <button
              onClick={() => toggleFavorite(animal.id)}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
              aria-label={`${favorites.has(animal.id) ? 'Remove from' : 'Add to'} favorites`}
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

          {/* CARD CONTENT */}
          <div className="p-5 h-[240px] flex flex-col">
            <div className="mb-3 flex items-center justify-between h-[50px]">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">{animal.name}</h3>
                <p className="text-sm text-gray-600 font-medium truncate">{animal.breed}</p>
              </div>
              <div
                className={`rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ml-2 ${
                  animal.gender === 'Male'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-pink-100 text-pink-800'
                }`}
              >
                {animal.age} • {animal.gender}
              </div>
            </div>

            <div className="mb-4 h-[20px] flex items-center">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{animal.location}</span>
              </div>
            </div>

            <div className="mb-5 h-[50px] flex-shrink-0">
              <p className="text-sm text-gray-600 line-clamp-3 overflow-hidden">{animal.description}</p>
            </div>

            <div className="flex gap-3 mt-auto">
              <Button
                className="flex-1 bg-red-500 hover:bg-red-400 text-white font-bold py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                onClick={() => window.open(`${adoptionUrl}/${animal.id}`, '_blank')}
              >
                Adopt Me
              </Button>
            </div>
          </div>

        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>

      </div>
    </section>
  );
};

export default AnimalGallery;