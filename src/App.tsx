import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import ServicesStrip from "./components/ServicesStrip";
import AnimalGallery from "./components/AnimalGallery";
import AdoptionProcess from "./components/AdoptionProcess";
import DonationSupport from "./components/DonationSupport";
import EventsCommunity from "./components/EventsCommunity";
import Testimonials from "./components/Testimonials";
import SocialMedia from "./components/SocialMedia";
import ContactLocation from "./components/ContactLocation";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

// HomePage composed of all your user-side components
function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <AboutUs />
      <ServicesStrip />
      <AnimalGallery />
      <AdoptionProcess />
      <DonationSupport />
      <EventsCommunity />
      <Testimonials />
      <SocialMedia />
      <ContactLocation />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<HomePage />} />

        <Route path="/admin-login" element={<AdminLogin />} />


        {/* Admin Panel Page */}
        <Route path="/admin" element={<AdminPanel />} />

      </Routes>
    </Router>
  );
}

export default App;
