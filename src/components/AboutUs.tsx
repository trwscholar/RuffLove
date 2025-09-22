import React from "react";
import aboutImg from "../assets/about-placeholder.png"; // replace with your image

const AboutUs = () => {
  return (
    <section id="about" className="relative py-20 bg-red-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-red-600 uppercase tracking-wider">
            About Us
          </h4>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
            Who We Are at{" "}
            <span className="text-red-600">Ruff Love Malaysia</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Ruff Love Malaysia, we believe that rescuing, rehabilitating, and
            rehoming animals is more than just a mission — it’s a promise. Every
            adoption not only saves a life, but it also opens up space for us to
            help another animal in need.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            With the dedication of our volunteers and the support of the
            community, we continue to build a future where every pet has a safe
            and loving home. Together, we make a difference, one paw at a time.
          </p>

          <button className="mt-6 inline-block bg-red-500 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-red-400 hover:scale-105 transition-transform duration-200">
            Learn More
          </button>
        </div>

        {/* Right: Image */}
        <div className="relative">
          <img
            src={aboutImg}
            alt="About Ruff Love"
            className="rounded-2xl shadow-lg object-cover w-full h-full max-h-[400px]"
          />
          {/* Subtle edge fade effect */}
          <div className="absolute inset-0 bg-gradient-to-l from-red-50 via-transparent to-transparent rounded-2xl"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
