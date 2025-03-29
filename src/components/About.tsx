
import React, { useEffect, useRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CheckCircle } from "lucide-react";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            entry.target.classList.remove("opacity-0");
            // Once the animation is applied, unobserve the element to prevent issues on scroll
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    if (elements) {
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (elements) {
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  const features = [
    "UK CTH (Confederation of Tourism and Hospitality) Accredited",
    "Internationally recognized qualifications",
    "Expert trainers from the hospitality industry",
    "Practical, industry-focused curriculum",
    "Job placement services in multiple countries",
    "Modern teaching facilities and resources"
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-kalibre-50">
      <div className="section-container" ref={sectionRef}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="reveal opacity-0">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-kalibre-100 text-kalibre-800 uppercase tracking-wide">
                About The Kalibre
              </span>
              <h2 className="section-heading">
                Excellence in Hospitality Education
              </h2>
              <p className="text-kalibre-600 mb-8">
                The Kalibre is a UK-based educational provider accredited by the prestigious CTH, 
                a leading UK governing body for the hospitality industry. We offer internationally 
                recognized hospitality courses in Pakistan, providing students with the skills and 
                knowledge needed to excel in the dynamic world of hospitality.
              </p>
            </div>

            <div className="reveal opacity-0" style={{ transitionDelay: "0.1s" }}>
              <h3 className="text-xl font-semibold mb-4 text-kalibre-800">Why Choose The Kalibre?</h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start transform hover:translate-x-2 transition-all duration-300">
                    <CheckCircle size={20} className="text-kalibre-700 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-kalibre-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="reveal opacity-0" style={{ transitionDelay: "0.2s" }}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full rounded-xl bg-kalibre-200 -z-10"></div>
              <div className="glassmorphism-card rounded-xl overflow-hidden transform hover:rotate-2 transition-all duration-500">
                <div className="w-full overflow-hidden">
                <AspectRatio ratio={4/3}>
                    <img 
                      src="https://res.cloudinary.com/dzwdsxj7s/image/upload/v1743260832/kaliber/jcbcy5rjrrmeclf5uqmi.jpg" 
                      alt="Hospitality students in classroom" 
                      className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                    />
                  </AspectRatio>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                  <img 
                      src="/public/only_logo.png" 
                      alt="CTH Logo" 
                      className="h-12 mr-4"
                    />
                    <div>
                      <div className="text-xl font-bold text-kalibre-800">CTH Accredited</div>
                      <div className="text-sm text-kalibre-600">UK Certified Education Provider</div>
                    </div>
                  </div>
                  <p className="text-kalibre-600 mb-4">
                    Our partnership with CTH ensures that our students receive globally recognized 
                    qualifications that open doors to international career opportunities.
                  </p>
                  <a 
                    href="#courses" 
                    className="inline-block text-kalibre-800 font-medium hover:text-kalibre-600 transition-all-200"
                  >
                    View our accredited courses →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
