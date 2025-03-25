
import React from "react";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-kalibre-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-kalibre-200 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="inline-block px-3 py-1 mb-6 text-xs font-medium rounded-full bg-kalibre-100 text-kalibre-800 uppercase tracking-wide">
                CTH Accredited Education Provider
              </span>
            </div>
            
            <h1 className="animate-fade-up text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 text-kalibre-950" style={{ animationDelay: "0.2s" }}>
              Unlock Your Global <br />
              <span className="text-kalibre-800">Hospitality Career</span>
            </h1>
            
            <p className="animate-fade-up text-kalibre-600 text-lg max-w-xl mb-8" style={{ animationDelay: "0.3s" }}>
              The Kalibre offers internationally recognized hospitality courses in Pakistan,
              with placement opportunities across Pakistan, Saudi Arabia, the Middle East, UK and Europe.
            </p>
            
            <div className="animate-fade-up flex flex-col sm:flex-row gap-4 w-full md:w-auto" style={{ animationDelay: "0.4s" }}>
              <a 
                href="#courses" 
                className="bg-kalibre-800 text-white px-8 py-4 rounded-md font-medium hover:bg-kalibre-700 transition-all-200 flex items-center justify-center transform hover:scale-105"
              >
                Explore Courses
                <ArrowRight size={18} className="ml-2" />
              </a>
              <a 
                href="#about" 
                className="bg-kalibre-100 text-kalibre-800 px-8 py-4 rounded-md font-medium hover:bg-kalibre-200 transition-all-200 transform hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>
          
          <div className="hidden md:block animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <div className="relative p-2 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg transform hover:rotate-1 transition-all duration-500">
              <AspectRatio ratio={4/3} className="rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Student learning hospitality" 
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              <div className="absolute -bottom-5 -right-5 p-4 bg-white rounded-xl shadow-md">
                <div className="text-xl font-bold text-kalibre-800">100%</div>
                <div className="text-sm text-kalibre-600">Placement Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-fade-up flex justify-center mt-16" style={{ animationDelay: "0.6s" }}>
          <div className="glassmorphism-card rounded-xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-kalibre-800">CTH</div>
                <div className="text-kalibre-600 text-sm mt-1">UK Accredited</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-kalibre-800">100%</div>
                <div className="text-kalibre-600 text-sm mt-1">Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-kalibre-800">5+</div>
                <div className="text-kalibre-600 text-sm mt-1">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-kalibre-800">Expert</div>
                <div className="text-kalibre-600 text-sm mt-1">Trainers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
