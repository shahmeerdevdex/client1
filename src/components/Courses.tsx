
import React, { useEffect, useRef } from "react";
import { GraduationCap, Clock, Award, ExternalLink } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Courses = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            entry.target.classList.remove("opacity-0");
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

  const courses = [
    {
      title: "Diploma in Hospitality Management",
      level: "Level 4",
      duration: "12 months",
      image: "https://images.unsplash.com/photo-1620503374956-c942862f0372?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      description: "A comprehensive program covering all aspects of hospitality management, including rooms division, food and beverage, and event management.",
      highlights: ["International qualification", "Full-time or part-time options", "Practical training included"]
    },
    {
      title: "Certificate in Culinary Arts",
      level: "Level 3",
      duration: "6 months",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      description: "Develop professional culinary skills with this hands-on program covering kitchen operations, food preparation, and culinary techniques.",
      highlights: ["Taught by professional chefs", "State-of-the-art kitchen facilities", "Portfolio development"]
    },
    {
      title: "Advanced Diploma in Hospitality & Tourism",
      level: "Level 5",
      duration: "18 months",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      description: "An advanced program for aspiring managers in the hospitality and tourism sectors, with specialized modules in management and strategy.",
      highlights: ["Higher level qualification", "Management focus", "Industry placement"]
    }
  ];

  return (
    <section id="courses" className="py-24">
      <div className="section-container" ref={sectionRef}>
        <div className="text-center mb-16">
          <div className="reveal opacity-0">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-kalibre-100 text-kalibre-800 uppercase tracking-wide">
              Our Programs
            </span>
            <h2 className="section-heading">
              Internationally Recognized Courses
            </h2>
            <p className="section-subheading mx-auto">
              Our CTH accredited programs provide you with the knowledge, skills, and qualifications 
              to launch a successful career in the global hospitality industry.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div 
              key={index} 
              className="reveal opacity-0 glassmorphism-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-8px]"
              style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
            >
              <AspectRatio ratio={16/9} className="bg-kalibre-100 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </AspectRatio>
              <div className="h-2 bg-kalibre-700"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-kalibre-900">{course.title}</h3>
                    <div className="flex items-center mt-2">
                      <span className="bg-kalibre-100 text-kalibre-800 text-xs px-2 py-1 rounded font-medium flex items-center">
                        <Award size={14} className="mr-1" />
                        {course.level}
                      </span>
                      <span className="bg-kalibre-50 text-kalibre-700 text-xs px-2 py-1 rounded font-medium ml-2 flex items-center">
                        <Clock size={14} className="mr-1" />
                        {course.duration}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-kalibre-100 flex items-center justify-center">
                    <GraduationCap size={20} className="text-kalibre-800" />
                  </div>
                </div>
                
                <p className="text-kalibre-600 text-sm mb-4">
                  {course.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-kalibre-800 mb-2">Highlights:</h4>
                  <ul className="text-sm text-kalibre-600">
                    {course.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center mb-1">
                        <span className="w-1.5 h-1.5 bg-kalibre-400 rounded-full mr-2"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a 
                  href="#apply" 
                  className="inline-flex items-center text-kalibre-800 font-medium hover:text-kalibre-600 transition-all-200 text-sm group"
                >
                  Learn more
                  <ExternalLink size={14} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal opacity-0 mt-12 text-center">
          <a 
            href="#apply" 
            className="inline-block bg-kalibre-800 text-white px-6 py-3 rounded-md font-medium hover:bg-kalibre-700 transition-all-200 transform hover:scale-105"
          >
            Apply for a Course
          </a>
        </div>
      </div>
    </section>
  );
};

export default Courses;
