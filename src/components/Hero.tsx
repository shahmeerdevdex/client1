
import React from "react";
import { ArrowRight, Award, Briefcase, GraduationCap } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-ocean-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-ocean-200 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="inline-block px-3 py-1 mb-6 text-xs font-medium rounded-full bg-ocean-100 text-ocean-800 uppercase tracking-wide">
                CTH Accredited Education Provider
              </span>
            </div>
            
            <h1 className="animate-fade-up text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4 text-ocean-500" style={{ animationDelay: "0.2s" }}>
              Empowering Future Hospitality Leaders
            </h1>
            
            <h2 className="animate-fade-up text-xl md:text-2xl lg:text-3xl font-display font-semibold mb-5 text-ocean-800" style={{ animationDelay: "0.25s" }}>
              Global Certifications & Job Placements
            </h2>
            
            <p className="animate-fade-up text-ocean-600 text-base max-w-xl mb-8" style={{ animationDelay: "0.3s" }}>
              Welcome to Kalibre, a premier hospitality education and placement specialist, operating under UK-based AAASK LTD. We are dedicated to shaping the next generation of hospitality professionals by offering globally recognized CTH certifications, hands-on industry training, and direct job placements in top hotels worldwide.
            </p>
            
            <div className="animate-fade-up flex flex-col sm:flex-row gap-4 w-full md:w-auto" style={{ animationDelay: "0.4s" }}>
              <a 
                href="#courses" 
                className="bg-ocean-500 text-white px-8 py-4 rounded-md font-medium hover:bg-ocean-600 transition-all-200 flex items-center justify-center transform hover:scale-105"
              >
                Explore Courses
                <ArrowRight size={18} className="ml-2" />
              </a>
              <a 
                href="#about" 
                className="bg-ocean-100 text-ocean-800 px-8 py-4 rounded-md font-medium hover:bg-ocean-200 transition-all-200 transform hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>
          
          <div className="hidden md:block animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <div className="relative p-2 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg transform hover:rotate-1 transition-all duration-500">
            <AspectRatio ratio={16/9} className="rounded-xl overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/dzwdsxj7s/image/upload/v1743260832/kaliber/vncfmllj5gtdos1ezcfy.jpg" 
                  alt="Student learning hospitality" 
                  className="object-containx w-full h-full"
                />
              </AspectRatio>
              <div className="absolute -bottom-5 -right-5 p-4 bg-white rounded-xl shadow-md">
                <div className="text-xl font-bold text-ocean-800">100%</div>
                <div className="text-sm text-ocean-600">Placement Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-fade-up mt-12 md:mt-16" style={{ animationDelay: "0.6s" }}>
          <h3 className="text-xl font-display font-semibold text-ocean-800 mb-6 text-center">Why Kalibre Stands Out?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6" style={{marginBottom:"5px"}}>
            <div className="glassmorphism-card rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                <GraduationCap className="text-ocean-700 mr-2" size={24} />
                <h4 className="text-lg font-display font-semibold text-ocean-800">Industry-Aligned CTH Certifications</h4>
              </div>
              <p className="text-ocean-600 text-sm mb-4">
                We provide CTH-certified programs, one of the most respected qualifications in the hospitality sector. Our courses are designed to meet global standards.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <span className="text-ocean-700 text-sm">Internationally recognized credentials</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <span className="text-ocean-700 text-sm">Practical skills for immediate job readiness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <span className="text-ocean-700 text-sm">Career advancement opportunities</span>
                </li>
              </ul>
            </div>
            
            <div className="glassmorphism-card rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                <Briefcase className="text-ocean-700 mr-2" size={24} />
                <h4 className="text-lg font-display font-semibold text-ocean-800">Learn While You Earn</h4>
              </div>
              <p className="text-ocean-600 text-sm mb-4">
                Unlike traditional institutes, we integrate education with employment. Our students get placed in prestigious hotels, restaurants and resorts during their studies.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <span className="text-ocean-700 text-sm">Earn while learning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <span className="text-ocean-700 text-sm">Gain hands-on experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <span className="text-ocean-700 text-sm">Build a strong professional network</span>
                </li>
              </ul>
            </div>
            
            <div className="glassmorphism-card rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                <Award className="text-ocean-700 mr-2" size={24} />
                <h4 className="text-lg font-display font-semibold text-ocean-800">Largest Hospitality Talent Pool</h4>
              </div>
              <p className="text-ocean-600 text-sm mb-4">
                With an extensive database of 30,000+ trained professionals, we supply skilled staff to hotels across the globe.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center">
                  <span className="text-blue-500 mr-1">🌍</span>
                  <span className="text-ocean-700 text-sm">UK & Europe</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-500 mr-1">🌍</span>
                  <span className="text-ocean-700 text-sm">USA</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-500 mr-1">🌏</span>
                  <span className="text-ocean-700 text-sm">Middle East</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-500 mr-1">🌎</span>
                  <span className="text-ocean-700 text-sm">Central & SE Asia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
