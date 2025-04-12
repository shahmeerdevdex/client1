
import React, { useEffect, useRef } from "react";
import { GraduationCap, Clock, Award, ExternalLink } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useEnrollment } from "@/context/EnrollmentContext";

const Courses = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const carouselApi = React.useRef<any>(null);
  const { openForm } = useEnrollment();
  
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

  // Update slider when carousel changes
  React.useEffect(() => {
    if (!carouselApi.current) return;
    
    const onChange = () => {
      if (!carouselApi.current) return;
      setCurrentSlide(carouselApi.current.selectedScrollSnap());
    };

    carouselApi.current?.on("select", onChange);
    return () => {
      carouselApi.current?.off("select", onChange);
    };
  }, [carouselApi]);

  // Update carousel when slider changes
  const handleSliderChange = (value: number[]) => {
    setCurrentSlide(value[0]);
    carouselApi.current?.scrollTo(value[0]);
  };

  const courses = [
    {
      title: "L2 Award in Cookery Skills",
      level: "Level 2",
      duration: "3 months",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      description: "A foundational program for aspiring chefs to learn basic cookery skills, food safety, and kitchen operations.",
      highlights: ["Entry-level qualification", "Practical cooking techniques", "Food safety certification"]
    },
    {
      title: "L2 Certificate in Culinary Skills",
      level: "Level 2",
      duration: "6 months",
      image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      description: "Expand your culinary expertise with this comprehensive program covering diverse cooking methods, menu planning, and food presentation.",
      highlights: ["Intermediate culinary techniques", "Menu development", "Professional kitchen experience"]
    },
    {
      title: "L2 Certificate in Hospitality Practice",
      level: "Level 2",
      duration: "6 months",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      description: "Develop essential skills across key hospitality areas including front desk operations, guest services, and basic hotel management.",
      highlights: ["Customer service excellence", "Front desk operations", "Hospitality fundamentals"]
    },
    {
      title: "L3 Diploma in Essentials of Hospitality & Tourism",
      level: "Level 3",
      duration: "9 months",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      description: "Gain comprehensive knowledge of both hospitality and tourism sectors with this integrated diploma program, preparing you for diverse roles.",
      highlights: ["Dual hospitality & tourism focus", "Advanced customer experience", "Business operations"]
    },
    {
      title: "Diploma in Hospitality Management",
      level: "Level 4",
      duration: "12 months",
      image: "https://res.cloudinary.com/dzwdsxj7s/image/upload/v1743260831/kaliber/vjuyrh3qs0d9qxfd9cqm.jpg",
      description: "A comprehensive program covering all aspects of hospitality management, including rooms division, food and beverage, and event management.",
      highlights: ["International qualification", "Full-time or part-time options", "Practical training included"]
    },
    {
      title: "Certificate in Culinary Arts",
      level: "Level 3",
      duration: "6 months",
      image: "https://res.cloudinary.com/dzwdsxj7s/image/upload/v1743260832/kaliber/q4zwboo2mpc8kynyejgd.jpg",
      description: "Develop professional culinary skills with this hands-on program covering kitchen operations, food preparation, and culinary techniques.",
      highlights: ["Taught by professional chefs", "State-of-the-art kitchen facilities", "Portfolio development"]
    },
    {
      title: "Advanced Diploma in Hospitality & Tourism",
      level: "Level 5",
      duration: "18 months",
      image: "https://res.cloudinary.com/dzwdsxj7s/image/upload/v1743260832/kaliber/qjqpooouphw7p2vzmz02.jpg",
      description: "An advanced program for aspiring managers in the hospitality and tourism sectors, with specialized modules in management and strategy.",
      highlights: ["Higher level qualification", "Management focus", "Industry placement"]
    }
  ];

  return (
    <section id="courses" className="py-16 md:py-20">
      <div className="section-container" ref={sectionRef}>
        <div className="text-center mb-12">
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

        <div className="reveal opacity-0 mb-10">
          <Carousel 
            className="w-full"
            setApi={(api) => (carouselApi.current = api)}
            opts={{
              align: "start",
              loop: false,
            }}
          >
            <CarouselContent>
              {courses.map((course, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/3">
                  <div className="p-1 h-full">
                    <div className="glassmorphism-card rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col hover:shadow-lg hover:translate-y-[-8px]">
                      <AspectRatio ratio={16/9} className="bg-kalibre-100 overflow-hidden">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                      </AspectRatio>
                      <div className="h-2 bg-kalibre-700"></div>
                      <div className="p-6 flex flex-col flex-grow">
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
                        
                        <div className="mb-6 flex-grow">
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
                        
                        <div className="flex items-center justify-between mt-auto">
                          <a 
                            href="#apply" 
                            className="inline-flex items-center text-kalibre-800 font-medium hover:text-kalibre-600 transition-all-200 text-sm group"
                          >
                            Learn more
                            <ExternalLink size={14} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                          </a>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-kalibre-700 border-kalibre-300 hover:bg-kalibre-50"
                            onClick={() => openForm(course.title)}
                          >
                            Enroll
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-end mt-2 space-x-2">
              <CarouselPrevious className="static transform-none" />
              <CarouselNext className="static transform-none" />
            </div>
          </Carousel>
          
          <div className="mt-6 px-4">
            <Slider
              value={[currentSlide]}
              max={courses.length - 1}
              step={1}
              onValueChange={handleSliderChange}
              className="w-full"
            />
          </div>
        </div>

        <div className="reveal opacity-0 mt-8 text-center">
          <Button 
            className="bg-kalibre-800 text-white px-6 py-3 rounded-md font-medium hover:bg-kalibre-700 transition-all-200 transform hover:scale-105"
            onClick={() => openForm(courses[currentSlide].title)}
          >
            Apply for a Course
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
