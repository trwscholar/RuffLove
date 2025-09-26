import React from 'react';
import { Stethoscope, Home, UtensilsCrossed, Shield, Heart } from 'lucide-react';

const DonationSupport = () => {
  const expenses = [
    { icon: Stethoscope, label: 'Veterinary Care Bills', cost: 'RM 2,500', color: 'text-blue-500' },
    { icon: Home, label: 'Boarding Bills', cost: 'RM 1,800', color: 'text-green-500' },
    { icon: UtensilsCrossed, label: 'Food & Supplies', cost: 'RM 1,200', color: 'text-orange-500' },
    { icon: Shield, label: 'Parasite Prevention', cost: 'RM 800', color: 'text-purple-500' },
    { icon: Heart, label: 'Animal House Rent', cost: 'RM 1,500', color: 'text-red-500' },
  ];

  return (
    <section id="donate" className="py-16 bg-pink-50 relative overflow-hidden">
      {/* Paw Print Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-red-300 text-4xl">🐾</div>
        <div className="absolute top-32 right-20 text-red-300 text-3xl">🐾</div>
        <div className="absolute bottom-20 left-32 text-red-300 text-3xl">🐾</div>
        <div className="absolute bottom-40 right-10 text-red-300 text-4xl">🐾</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-300 text-2xl">🐾</div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-500 mb-4 font-rounded">
            Help Us Care for 46 Animals
          </h2>
          <p className="text-xl text-gray-700 mb-2">
            Your donation directly supports our furry friends
          </p>
          <p className="text-lg text-gray-600">
            Monthly expenses breakdown:
          </p>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              <span className="text-red-500">❤️</span>
              <span className="text-red-500">❤️</span>
              <span className="text-red-500">❤️</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {expenses.map((expense, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100 group hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-pink-100 transition-colors duration-300">
                  <expense.icon className={`w-6 h-6 ${expense.color}`} />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800">{expense.label}</h3>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-red-500">{expense.cost}</span>
                <span className="text-gray-500 text-sm">/month</span>
              </div>
            </div>
          ))}
          
          {/* Total Card */}
          <div className="bg-red-500 rounded-2xl p-6 shadow-lg text-white lg:col-span-3 md:col-span-2">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Total Monthly Need</h3>
              <div className="text-4xl font-bold mb-2">RM 7,800</div>
              <p className="opacity-90">Help us reach our goal to provide the best care</p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-red-500 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-red-400 hover:scale-105 transition-all duration-300 hover:shadow-pink-200 hover:shadow-xl relative overflow-hidden">
              <span className="relative z-10">Donate Now</span>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                🐾
              </div>
            </button>
            
            <button className="group border-2 border-red-500 text-red-500 px-8 py-4 rounded-full font-bold text-xl hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <span className="relative z-10">Sponsor a Pet</span>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                ❤️
              </div>
            </button>
          </div>
          
          <p className="text-gray-600 text-sm">
            Every ringgit counts • Tax receipts available • 100% goes to animal care
          </p>
        </div>
      </div>
    </section>
  );
};

export default DonationSupport;