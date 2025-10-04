import React from "react";
import { HandWrittenTitle } from "./ui/hand-writing-text";
import aboutImg from "../assets/about-placeholder.png"; // use your actual image

const AboutUs = () => {
  return (
    <section id="about" className="relative py-20 bg-red-50 overflow-hidden">
      {/* Main content container */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: Text */}
          <div className="lg:col-span-5 space-y-6 relative z-10">
            <h4 className="text-xs sm:text-sm font-semibold text-red-600 uppercase tracking-wider">
              About Us
            </h4>

            <HandWrittenTitle
                title="Who We Are At Ruff Love Malaysia"
                className="mb-4 text-2xl sm:text-3xl md:text-4xl"
              />

            {/* Image (mobile/tablet only) - Appears after title */}
            <div className="lg:hidden relative mb-6">
              <img
                src={aboutImg}
                alt="About Ruff Love"
                className="w-full h-[340px] sm:h-[420px] object-cover rounded-2xl shadow-lg"
              />
            </div>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              At Ruff Love Malaysia, we believe that rescuing, rehabilitating, and
              rehoming animals is more than just a mission — it's a promise. Every
              adoption not only saves a life, but it also opens up space for us to
              help another animal in need.
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              With the dedication of our volunteers and the support of the
              community, we continue to build a future where every pet has a safe
              and loving home. Together, we make a difference, one paw at a time.
            </p>

            <button className="mt-6 inline-flex items-center justify-center rounded-full bg-[#E53935] px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-red-500 active:scale-95 w-full sm:w-auto">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: Image (desktop only) */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[50vw]">
        <img
          src={aboutImg}
          alt="About Ruff Love"
          className="w-full h-full object-cover"
        />
        {/* Softer edge fade (reduced from w-64 to w-32) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-red-50 via-red-50/80 to-transparent" />
      </div>
    </section>
  );
};

export default AboutUs;
