import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import ruffLogo from "../assets/rufflovelogo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection(""); // Clear active section when not on homepage
      return;
    }

    const handleScroll = () => {
      const sections = ["about", "adopt", "donate", "events", "contact"];
      const navHeight = 64;

      if (window.scrollY < 200) {
        setActiveSection("home");
        return;
      }

      let foundActiveSection = "";
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY - navHeight;
          const elementBottom = elementTop + rect.height;

          if (
            window.scrollY >= elementTop - 150 &&
            window.scrollY < elementBottom - 100
          ) {
            foundActiveSection = sectionId;
            break;
          }
        }
      }

      if (!foundActiveSection && window.scrollY >= 200) {
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= navHeight + 150) {
              foundActiveSection = sectionId;
            }
          }
        }
      }

      if (foundActiveSection) {
        setActiveSection(foundActiveSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Smooth scroll to section function
  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      // ✅ FIX: use template string, not regex
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64;
      const elementPosition = element.offsetTop - navHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }

    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: "home", label: "Home", type: "route" as const, path: "/" },
    { id: "about", label: "About Us", type: "section" as const, sectionId: "about" },
    { id: "adopt", label: "Adopt", type: "section" as const, sectionId: "adopt" },
    { id: "donate", label: "Donate", type: "section" as const, sectionId: "donate" },
    { id: "events", label: "Events", type: "section" as const, sectionId: "events" },
    { id: "contact", label: "Contact", type: "section" as const, sectionId: "contact" },
    { id: "admin", label: "Admin Panel", type: "route" as const, path: "/admin" },
  ];

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
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={ruffLogo}
                alt="Ruff Love Malaysia"
                className="h-12 w-auto object-contain select-none"
                draggable={false}
              />
              <span className="text-xl font-bold text-gray-800 font-rounded">
                Ruff Love Malaysia
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                let isActive = false;

                if (link.type === "route") {
                  if (link.id === "home") {
                    isActive =
                      location.pathname === link.path && activeSection === "home";
                  } else {
                    isActive = location.pathname === link.path;
                  }
                } else {
                  isActive = activeSection === link.sectionId;
                }

                if (link.type === "route") {
                  return (
                    <Link
                      key={link.id}
                      to={link.path}
                      onClick={link.id === "home" ? scrollToTop : undefined}
                      className={`relative text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium ${
                        isActive ? "text-red-500" : ""
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full"></div>
                      )}
                    </Link>
                  );
                } else {
                  return (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.sectionId)}
                      className={`relative text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium focus:outline-none ${
                        isActive ? "text-red-500" : ""
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full"></div>
                      )}
                    </button>
                  );
                }
              })}
            </div>

            {/* Desktop CTA + Social Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => scrollToSection("adopt")}
                className="group bg-red-500 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-red-400 hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-pink-200 hover:shadow-lg"
              >
                <span className="relative z-10">Adopt Now</span>
              </button>

              <a
                href="https://www.instagram.com/rufflove"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-500 transition-colors duration-200"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/rufflove"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-500 transition-colors duration-200"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => scrollToSection("adopt")}
                className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-md hover:bg-red-400 transition-colors duration-200"
              >
                Adopt Now
              </button>
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
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            {navLinks.map((link) => {
              let isActive = false;

              if (link.type === "route") {
                if (link.id === "home") {
                  isActive =
                    location.pathname === link.path && activeSection === "home";
                } else {
                  isActive = location.pathname === link.path;
                }
              } else {
                isActive = activeSection === link.sectionId;
              }

              if (link.type === "route") {
                return (
                  <Link
                    key={link.id}
                    to={link.path}
                    onClick={
                      link.id === "home" ? scrollToTop : () => setIsMobileMenuOpen(false)
                    }
                    className={`block py-2 text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium ${
                      isActive ? "text-red-500 border-l-2 border-red-500 pl-2" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              } else {
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.sectionId)}
                    className={`block w-full text-left py-2 text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium focus:outline-none ${
                      isActive ? "text-red-500 border-l-2 border-red-500 pl-2" : ""
                    }`}
                  >
                    {link.label}
                  </button>
                );
              }
            })}

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
                href="https://www.facebook.com/rufflove.my/"
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

      <div className="h-16"></div>
    </>
  );
};

export default Navigation;
