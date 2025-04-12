
import React from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-kalibre-900 text-white pt-16 pb-10">
      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1">
            <div className="mb-6">
              <a href="#" className="text-2xl font-display font-bold">
                <span className="text-kalibre-300">The</span> Kalibre
              </a>
            </div>
            <p className="text-kalibre-300 text-sm mb-6">
              UK-based educational provider accredited by the prestigious CTH, offering internationally 
              recognized hospitality courses with job placement opportunities worldwide.
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
            <div className="flex items-center mb-6">
              <Mail size={18} className="text-kalibre-400 mr-3 flex-shrink-0" />
              <a href="mailto:info@thekalibre.com" className="text-kalibre-300 hover:text-white transition-all-200 text-sm">
                info@thekalibre.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-kalibre-800 mb-6">
          <h3 className="text-lg font-semibold mb-6 text-white">Our Global Offices</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            <div className="flex items-start">
              <MapPin size={18} className="text-kalibre-400 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white text-sm font-medium mb-1">UK Office</h4>
                <p className="text-kalibre-300 text-xs mb-1">9 Isabel Terrace, Pragel Street, London, England, E13 9DN</p>
                <a href="tel:+447471737541" className="text-kalibre-300 hover:text-white transition-all-200 text-xs">
                  +44 747 173 7541
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin size={18} className="text-kalibre-400 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white text-sm font-medium mb-1">Ireland Office</h4>
                <p className="text-kalibre-300 text-xs mb-1">Dublin, Ireland</p>
                <a href="tel:+35312345678" className="text-kalibre-300 hover:text-white transition-all-200 text-xs">
                  +353 1 234 5678
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin size={18} className="text-kalibre-400 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white text-sm font-medium mb-1">USA Office</h4>
                <p className="text-kalibre-300 text-xs mb-1">203 Courthouse Drive, Morrisville, NC, 27560</p>
                <a href="tel:+19199192882" className="text-kalibre-300 hover:text-white transition-all-200 text-xs">
                  +1 919 919 2882
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin size={18} className="text-kalibre-400 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white text-sm font-medium mb-1">Europe Office</h4>
                <p className="text-kalibre-300 text-xs mb-1">Central European location</p>
                <a href="tel:+431234567890" className="text-kalibre-300 hover:text-white transition-all-200 text-xs">
                  +43 123 456 7890
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin size={18} className="text-kalibre-400 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white text-sm font-medium mb-1">UAE Office</h4>
                <p className="text-kalibre-300 text-xs mb-1">23rd St - Al Barsha, Dubai - United Arab Emirates</p>
                <a href="tel:+971564178107" className="text-kalibre-300 hover:text-white transition-all-200 text-xs">
                  +971 564 178 107
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin size={18} className="text-kalibre-400 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white text-sm font-medium mb-1">Saudi Arabia Office</h4>
                <p className="text-kalibre-300 text-xs mb-1">Riyadh, Saudi Arabia</p>
                <a href="tel:+966501234567" className="text-kalibre-300 hover:text-white transition-all-200 text-xs">
                  +966 50 123 4567
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin size={18} className="text-kalibre-400 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white text-sm font-medium mb-1">Malaysia Office</h4>
                <p className="text-kalibre-300 text-xs mb-1">Kuala Lumpur, Malaysia</p>
                <a href="tel:+60123456789" className="text-kalibre-300 hover:text-white transition-all-200 text-xs">
                  +60 12 345 6789
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin size={18} className="text-kalibre-400 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white text-sm font-medium mb-1">Pakistan Office</h4>
                <p className="text-kalibre-300 text-xs mb-1">Gold Crest Mall, Sector DD, Phase 4, 6th Floor, DHA, Lahore</p>
                <a href="tel:+923100300005" className="text-kalibre-300 hover:text-white transition-all-200 text-xs">
                  +92 310 030 0005
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin size={18} className="text-kalibre-400 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white text-sm font-medium mb-1">Indonesia Office</h4>
                <p className="text-kalibre-300 text-xs mb-1">Jakarta, Indonesia</p>
                <a href="tel:+6281234567890" className="text-kalibre-300 hover:text-white transition-all-200 text-xs">
                  +62 812 3456 7890
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin size={18} className="text-kalibre-400 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white text-sm font-medium mb-1">Mauritius Office</h4>
                <p className="text-kalibre-300 text-xs mb-1">Port Louis, Mauritius</p>
                <a href="tel:+2301234567" className="text-kalibre-300 hover:text-white transition-all-200 text-xs">
                  +230 123 4567
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-kalibre-800 text-center">
          <p className="text-kalibre-400 text-sm">
            © 2022 The Kalibre: operating under AAASK LTD, UK | Company Number: 14107209 All rights reserved. CTH Accredited Education Provider.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
