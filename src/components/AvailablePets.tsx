import React from 'react';
import { Heart } from 'lucide-react';

const AvailablePets = () => {
  const pets = [
    {
      id: 1,
      name: 'Buddy',
      age: '2 years',
      gender: 'Male',
      breed: 'Golden Retriever',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      name: 'Luna',
      age: '1 year',
      gender: 'Female',
      breed: 'Persian Cat',
      image: 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      name: 'Max',
      age: '3 years',
      gender: 'Male',
      breed: 'Labrador Mix',
      image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 4,
      name: 'Bella',
      age: '2 years',
      gender: 'Female',
      breed: 'Siamese Cat',
      image: 'https://images.pexels.com/photos/1276553/pexels-photo-1276553.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 5,
      name: 'Charlie',
      age: '4 years',
      gender: 'Male',
      breed: 'Beagle',
      image: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 6,
      name: 'Mia',
      age: '1 year',
      gender: 'Female',
      breed: 'Maine Coon',
      image: 'https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  return (
    <section id="adopt" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-rounded">
            Meet Our Available Pets
          </h2>
          <p className="text-xl text-gray-600">
            These loving animals are ready for their forever homes
          </p>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              <span className="text-red-500">🐾</span>
              <span className="text-red-500">🐾</span>
              <span className="text-red-500">🐾</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 border border-pink-100 relative"
            >
              {/* Paw overlay on hover */}
              <div className="absolute inset-0 bg-pink-50 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-4 right-4 text-red-500 text-2xl opacity-50">🐾</div>
              </div>
              
              <div className="aspect-square overflow-hidden">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-gray-800">{pet.name}</h3>
                  <Heart className="w-6 h-6 text-pink-400 group-hover:text-red-500 transition-colors duration-300" />
                </div>
                
                <div className="space-y-1 mb-4">
                  <p className="text-gray-600">Age: {pet.age}</p>
                  <p className="text-gray-600">Gender: {pet.gender}</p>
                  <p className="text-gray-600">Breed: {pet.breed}</p>
                </div>
                
                <button className="group/btn w-full bg-red-500 text-white py-3 rounded-full font-bold hover:bg-red-400 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-200 hover:shadow-xl relative overflow-hidden">
                  <span className="relative z-10">Adopt Me</span>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300">
                    🐾
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="group bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-400 hover:scale-105 transition-all duration-300 hover:shadow-pink-200 hover:shadow-xl relative overflow-hidden">
            <span className="relative z-10">View All Pets</span>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              🐾
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AvailablePets;