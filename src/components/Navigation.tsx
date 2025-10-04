import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import ruffLogo from "../assets/rufflovelogo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home", href: "#home", type: "section" as const },
    { id: "about", label: "About Us", href: "#about", type: "section" as const },
    { id: "adopt", label: "Adopt", href: "#adopt", type: "section" as const },
    { id: "donate", label: "Donate", href: "#donate", type: "section" as const },
    { id: "events", label: "Events", href: "#events", type: "section" as const },
    { id: "contact", label: "Contact", href: "#contact", type: "section" as const },
  ];

  const handleLinkClick = (linkId: string, href?: string, type?: string) => {
    setActiveLink(linkId);
    setIsMobileMenuOpen(false);

    if (type === "route" && href) {
      navigate(href);
      return;
    }

    // Smooth scroll to section for hash links
    if (type === "section" && href) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-white"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center space-x-2"
              onClick={() => handleLinkClick("home")}
            >
              <img
                src={ruffLogo}
                alt="Ruff Love Malaysia"
                className="h-12 w-auto object-contain select-none"
                draggable={false}
              />
              <span className="text-base sm:text-lg md:text-xl font-bold text-gray-800 font-rounded whitespace-nowrap">
                Ruff Love Malaysia
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) =>
                link.type === "route" ? (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id, link.href, link.type)}
                    className={`relative text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium whitespace-nowrap ${
                      activeLink === link.id ? "text-red-500" : ""
                    }`}
                  >
                    {link.label}
                    {activeLink === link.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full"></div>
                    )}
                  </button>
                ) : (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => handleLinkClick(link.id, link.href, link.type)}
                    className={`relative text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium whitespace-nowrap ${
                      activeLink === link.id ? "text-red-500" : ""
                    }`}
                  >
                    {link.label}
                    {activeLink === link.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full"></div>
                    )}
                  </a>
                )
              )}
            </div>

            {/* Desktop CTA + Social Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#adopt" className="bg-red-500 text-white px-4 py-1.5 rounded-full font-semibold text-sm shadow-md hover:bg-red-400 transition-all duration-200">
                Adopt Now
              </a>

              <a
                href="https://www.instagram.com/rufflove.my/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-500 transition-colors duration-200"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/rufflove.my/?ref=_xav_ig_profile_page_web#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-500 transition-colors duration-200"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <a href="#adopt" className="bg-red-500 text-white px-3 py-1.5 rounded-full font-semibold text-xs sm:text-sm shadow-md hover:bg-red-400 transition-colors duration-200">
                Adopt Now
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-red-500 transition-colors duration-200"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button> 
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id, link.href, link.type)}
                className={`block w-full text-left py-2 text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium ${
                  activeLink === link.id ? "text-red-500 border-l-2 border-red-500 pl-2" : ""
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Social Icons for Mobile */}
            <div className="pt-3 border-t border-gray-100 flex space-x-4">
              <a
                href="https://www.instagram.com/rufflove.my/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-500 transition-colors duration-200"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/rufflove.my/?ref=_xav_ig_profile_page_web#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-500 transition-colors duration-200"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
};

export default Navigation;
