
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#courses", label: "Courses" },
    { href: "#placement", label: "Placement" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        scrolled 
          ? "glassmorphism shadow-sm py-3" 
          : "bg-transparent"
      )}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between">
        <div className="flex items-center">
            <a href="#" className="text-2xl font-display font-bold text-kalibre-950 flex items-center gap-2">
              <img 
                src="/public/logo.png" 
                alt="The Kalibre Logo" 
                className="h-10 w-auto"
              />

            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-kalibre-700 hover:text-kalibre-950 transition-all-200 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#apply"
              className="bg-kalibre-800 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-kalibre-700 transition-all-200"
            >
              Apply Now
            </a>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden text-kalibre-800 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "md:hidden fixed inset-0 z-50 glassmorphism-card pt-20",
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
          style={{ 
            transition: "opacity 0.3s ease-in-out"
          }}
        >
          <div className="flex flex-col items-center space-y-6 p-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-kalibre-800 text-lg font-medium"
                onClick={toggleMenu}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#apply"
              className="bg-kalibre-800 text-white px-6 py-3 rounded-md text-base font-medium w-full text-center"
              onClick={toggleMenu}
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
