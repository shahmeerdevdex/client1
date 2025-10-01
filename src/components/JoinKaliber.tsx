
import React from "react";
import { CheckCircle, MapPin } from "lucide-react";

const JoinKaliber = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-ocean-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-ocean-100 text-ocean-800 uppercase tracking-wide">
            Your Future In Hospitality
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-3 tracking-tight text-ocean-500">
            Who Should Join Kaliber?
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <div className="glassmorphism-card rounded-xl p-8 hover:shadow-lg transition-all">
            <h3 className="text-xl font-display font-semibold text-ocean-800 mb-6">
              Perfect For Those Who Want To:
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-ocean-700">Aspiring hospitality professionals looking for a structured career path</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-ocean-700">Hotel staff seeking upskilling and international certifications</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-ocean-700">Career switchers wanting to enter the high-growth hospitality sector</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-ocean-700">Hotels & Resorts in need of trained, certified, and job-ready talent</span>
              </li>
            </ul>
          </div>
          
          <div className="glassmorphism-card rounded-xl p-8 hover:shadow-lg transition-all">
            <h3 className="text-xl font-display font-semibold text-ocean-800 mb-6">
              Our Global Reach
            </h3>
            <p className="text-ocean-700 mb-4">
              We operate across multiple regions, ensuring our students have access to the best opportunities in:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center">
                <MapPin size={18} className="text-ocean-600 mr-2 flex-shrink-0" />
                <span className="text-ocean-700">United Kingdom</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="text-ocean-600 mr-2 flex-shrink-0" />
                <span className="text-ocean-700">Ireland</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="text-ocean-600 mr-2 flex-shrink-0" />
                <span className="text-ocean-700">USA</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="text-ocean-600 mr-2 flex-shrink-0" />
                <span className="text-ocean-700">Europe</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="text-ocean-600 mr-2 flex-shrink-0" />
                <span className="text-ocean-700">UAE</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="text-ocean-600 mr-2 flex-shrink-0" />
                <span className="text-ocean-700">Saudi Arabia</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="text-ocean-600 mr-2 flex-shrink-0" />
                <span className="text-ocean-700">Malaysia</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="text-ocean-600 mr-2 flex-shrink-0" />
                <span className="text-ocean-700">Pakistan</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="text-ocean-600 mr-2 flex-shrink-0" />
                <span className="text-ocean-700">Indonesia</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="text-ocean-600 mr-2 flex-shrink-0" />
                <span className="text-ocean-700">Mauritius</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glassmorphism-card rounded-xl p-8 hover:shadow-lg transition-all mb-20">
          <h3 className="text-xl font-display font-semibold text-ocean-800 mb-6 text-center">
            How It Works?
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-ocean-800 font-bold">1</span>
              </div>
              <h4 className="font-display font-medium text-ocean-800 mb-2">Enroll in a CTH Certification Program</h4>
              <p className="text-ocean-600 text-sm">Choose from a range of hospitality courses.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-ocean-800 font-bold">2</span>
              </div>
              <h4 className="font-display font-medium text-ocean-800 mb-2">Get Placed in a Hotel / Restaurant</h4>
              <p className="text-ocean-600 text-sm">Start working while studying.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-ocean-800 font-bold">3</span>
              </div>
              <h4 className="font-display font-medium text-ocean-800 mb-2">Graduate with Experience & Certification</h4>
              <p className="text-ocean-600 text-sm">Stand out in the job market.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-ocean-800 font-bold">4</span>
              </div>
              <h4 className="font-display font-medium text-ocean-800 mb-2">Secure Your Dream Job</h4>
              <p className="text-ocean-600 text-sm">Get hired by top employers worldwide.</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <h3 className="text-2xl font-display font-semibold text-ocean-800 mb-6">
            Join Kaliber Today & Launch Your Hospitality Career!
          </h3>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center">
              <span className="text-ocean-800 text-xl mr-2">🔥</span>
              <span className="text-ocean-700">Learn from industry experts</span>
            </div>
            <div className="flex items-center">
              <span className="text-ocean-800 text-xl mr-2">💼</span>
              <span className="text-ocean-700">Gain real work experience</span>
            </div>
            <div className="flex items-center">
              <span className="text-ocean-800 text-xl mr-2">🌐</span>
              <span className="text-ocean-700">Access global job opportunities</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#courses" 
              className="bg-ocean-500 text-white px-6 py-3 rounded-md font-medium hover:bg-ocean-600 transition-all-200 transform hover:scale-105"
            >
              Enroll Today
            </a>
            <a 
              href="#contact" 
              className="bg-ocean-100 text-ocean-800 px-6 py-3 rounded-md font-medium hover:bg-ocean-200 transition-all-200 transform hover:scale-105"
            >
              Speak to an Advisor
            </a>
            <a 
              href="#courses" 
              className="border border-ocean-300 text-ocean-800 px-6 py-3 rounded-md font-medium hover:bg-ocean-50 transition-all-200 transform hover:scale-105"
            >
              Explore Courses
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinKaliber;
