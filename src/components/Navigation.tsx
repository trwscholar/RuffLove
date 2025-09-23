import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import ruffLogo from "../assets/rufflovelogo.png";

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = ["about", "adopt", "donate", "events", "contact"];
    const navHeight = 64;

    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection("home");
        return;
      }

      let found = "";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - navHeight - 50;
          const bottom = top + el.offsetHeight;
          if (window.scrollY >= top && window.scrollY < bottom) {
            found = id;
          }
        }
      });

      if (found) setActiveSection(found);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.offsetTop - 64; // nav height
      window.scrollTo({ top, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            <Link to="/" className="flex items-center space-x-2">
              <img src={ruffLogo} alt="Ruff Love Malaysia" className="h-12 w-auto" draggable={false} />
              <span className="text-xl font-bold text-gray-800">Ruff Love Malaysia</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive =
                  link.type === "route"
                    ? location.pathname === link.path && (link.id === "home" ? activeSection === "home" : true)
                    : activeSection === link.sectionId;

                if (link.type === "route") {
                  return (
                    <Link
                      key={link.id}
                      to={link.path}
                      onClick={link.id === "home" ? scrollToTop : undefined}
                      className={`relative text-gray-700 hover:text-red-500 font-medium ${isActive ? "text-red-500" : ""}`}
                    >
                      {link.label}
                      {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full" />}
                    </Link>
                  );
                } else {
                  return (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.sectionId)}
                      className={`relative text-gray-700 hover:text-red-500 font-medium focus:outline-none ${isActive ? "text-red-500" : ""}`}
                    >
                      {link.label}
                      {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full" />}
                    </button>
                  );
                }
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => scrollToSection("adopt")}
                className="bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-red-400 transition"
              >
                Adopt Now
              </button>
              <a href="https://www.instagram.com/rufflove" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-500">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/rufflove" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-500">
                <FaFacebook className="w-6 h-6" />
              </a>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center space-x-2">
              <button onClick={() => scrollToSection("adopt")} className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                Adopt Now
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-700">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
          <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            {navLinks.map((link) =>
              link.type === "route" ? (
                <Link
                  key={link.id}
                  to={link.path}
                  onClick={link.id === "home" ? scrollToTop : () => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-gray-700 hover:text-red-500 font-medium ${activeSection === link.id ? "text-red-500" : ""}`}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.sectionId)}
                  className={`block w-full text-left py-2 text-gray-700 hover:text-red-500 font-medium ${activeSection === link.sectionId ? "text-red-500" : ""}`}
                >
                  {link.label}
                </button>
              )
            )}

            <div className="pt-3 border-t border-gray-100 flex space-x-4">
              <a href="https://www.instagram.com/rufflove.my/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-500">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/rufflove.my/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-500">
                <FaFacebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16" /> {/* spacer */}
    </>
  );
};

export default Navigation;
