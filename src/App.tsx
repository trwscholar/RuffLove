import React from 'react';
import Navigation from './components/Navigation';
import ServicesStrip from './components/ServicesStrip';
import Hero from './components/Hero';
import AvailablePets from './components/AvailablePets';
import AdoptionProcess from './components/AdoptionProcess';
import DonationSupport from './components/DonationSupport';
import EventsCommunity from './components/EventsCommunity';
import Testimonials from './components/Testimonials';
import ContactLocation from './components/ContactLocation';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <ServicesStrip />
      <AvailablePets />
      <AdoptionProcess />
      <DonationSupport />
      <EventsCommunity />
      <Testimonials />
      <ContactLocation />
      <Footer />
    </div>
  );
}

export default App;