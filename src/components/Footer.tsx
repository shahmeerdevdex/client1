
import React from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-kalibre-900 text-white pt-20 pb-10">
      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <div className="mb-6">
              <a href="#" className="text-2xl font-display font-bold">
                <span className="text-kalibre-300">The</span> Kalibre
              </a>
            </div>
            <p className="text-kalibre-300 text-sm mb-6">
              UK-based educational provider accredited by the prestigious CTH, offering internationally 
              recognized hospitality courses with placement opportunities worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-kalibre-400 hover:text-white transition-all-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-kalibre-400 hover:text-white transition-all-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-kalibre-400 hover:text-white transition-all-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-kalibre-400 hover:text-white transition-all-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-kalibre-300 hover:text-white transition-all-200 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#courses" className="text-kalibre-300 hover:text-white transition-all-200 text-sm">
                  Our Courses
                </a>
              </li>
              <li>
                <a href="#placement" className="text-kalibre-300 hover:text-white transition-all-200 text-sm">
                  Job Placement
                </a>
              </li>
              <li>
                <a href="#" className="text-kalibre-300 hover:text-white transition-all-200 text-sm">
                  CTH Accreditation
                </a>
              </li>
              <li>
                <a href="#" className="text-kalibre-300 hover:text-white transition-all-200 text-sm">
                  Student Resources
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Courses</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-kalibre-300 hover:text-white transition-all-200 text-sm">
                  Diploma in Hospitality Management
                </a>
              </li>
              <li>
                <a href="#" className="text-kalibre-300 hover:text-white transition-all-200 text-sm">
                  Certificate in Culinary Arts
                </a>
              </li>
              <li>
                <a href="#" className="text-kalibre-300 hover:text-white transition-all-200 text-sm">
                  Advanced Diploma in Hospitality & Tourism
                </a>
              </li>
              <li>
                <a href="#" className="text-kalibre-300 hover:text-white transition-all-200 text-sm">
                  Short Courses & Workshops
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-kalibre-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-kalibre-300 text-sm">
                  The Kalibre Education Center,<br />
                  Main Campus, Islamabad, Pakistan
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-kalibre-400 mr-3 flex-shrink-0" />
                <a href="tel:+923001234567" className="text-kalibre-300 hover:text-white transition-all-200 text-sm">
                  +92 300 123 4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-kalibre-400 mr-3 flex-shrink-0" />
                <a href="mailto:info@thekalibre.com" className="text-kalibre-300 hover:text-white transition-all-200 text-sm">
                  info@thekalibre.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-kalibre-800 text-center">
          <p className="text-kalibre-400 text-sm">
            © {currentYear} The Kalibre. All rights reserved. CTH Accredited Education Provider.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
