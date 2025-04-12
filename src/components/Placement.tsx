
import React, { useEffect, useRef, useState } from "react";
import { Briefcase, MapPin, Building, Users, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const Placement = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
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

  useEffect(() => {
    if (carouselApi) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      intervalRef.current = setInterval(() => {
        if (carouselApi.canScrollNext()) {
          carouselApi.scrollNext();
        } else {
          carouselApi.scrollTo(0);
        }
      }, 4000); // 4 seconds interval
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [carouselApi]);

  // Update scroll buttons state
  const updateScrollButtonState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer for rounding errors
      setScrollPosition(scrollLeft);
    }
  };

  // Initialize scroll state
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      updateScrollButtonState();
      container.addEventListener('scroll', updateScrollButtonState);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScrollButtonState);
      }
    };
  }, []);

  // Set up auto-scroll functionality
  useEffect(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    
    autoScrollIntervalRef.current = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        
        if (scrollLeft >= scrollWidth - clientWidth - 5) {
          // Reset to beginning when reached the end
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll to next card
          scrollContainerRef.current.scrollTo({
            left: scrollLeft + 240,
            behavior: 'smooth'
          });
        }
        
        // Update button states after scrolling
        setTimeout(updateScrollButtonState, 500);
      }
    }, 5000); // Auto scroll every 5 seconds
    
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, []);

  // Handle manual scroll buttons
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      const newPosition = Math.max(0, scrollPosition - 240);
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const newPosition = Math.min(maxScroll, scrollPosition + 240);
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  const locations = [
    {
      icon: <MapPin size={24} className="text-ocean-500" />,
      region: "United Kingdom",
      image: "https://res.cloudinary.com/dzwdsxj7s/image/upload/v1743277239/kaliber/ztwd0zuh5njalrakhfev.jpg",
      description: "Prestigious establishments in London and other major UK cities."
    },
    {
      icon: <MapPin size={24} className="text-ocean-500" />,
      region: "Ireland",
      image: "https://res.cloudinary.com/dzwdsxj7s/image/upload/v1743277322/kaliber/kihy8rzgeb6vlvu5c9dj.jpg",
      description: "Leading hospitality venues across Dublin and Irish tourist destinations."
    },
    {
      icon: <MapPin size={24} className="text-ocean-500" />,
      region: "USA",
      image: "https://res.cloudinary.com/dzwdsxj7s/image/upload/v1743277360/kaliber/osk14g6xtaai1kmi0fme.jpg",
      description: "Premium hotel chains in New York, Miami, Los Angeles and other major cities."
    },
    {
      icon: <MapPin size={24} className="text-ocean-500" />,
      region: "Europe",
      image: "https://res.cloudinary.com/dzwdsxj7s/image/upload/v1743277360/kaliber/osk14g6xtaai1kmi0fme.jpg",
      description: "International hotel groups across European capitals and resort destinations."
    },
    {
      icon: <MapPin size={24} className="text-ocean-500" />,
      region: "UAE",
      image: "https://res.cloudinary.com/dzwdsxj7s/image/upload/v1743277526/kaliber/rvkizqecehhqvinvu9qt.jpg",
      description: "5-star hotel chains across Dubai, Abu Dhabi, and other UAE destinations."
    },
    {
      icon: <MapPin size={24} className="text-ocean-500" />,
      region: "Saudi Arabia",
      image: "https://res.cloudinary.com/dzwdsxj7s/image/upload/v1743277577/kaliber/w9j0dvaj54kchhjpfthg.jpg",
      description: "Luxury accommodations in Riyadh, Jeddah, and prestigious holy cities."
    },
    {
      icon: <MapPin size={24} className="text-ocean-500" />,
      region: "Malaysia",
      image: "https://res.cloudinary.com/dzwdsxj7s/image/upload/v1743277869/kaliber/l7gtjd4dv11inslya3yb.jpg",
      description: "Leading hospitality venues across Kuala Lumpur and Malaysian tourist spots."
    },
    {
      icon: <MapPin size={24} className="text-ocean-500" />,
      region: "Pakistan",
      image: "https://res.cloudinary.com/dzwdsxj7s/image/upload/v1743277615/kaliber/jnusxt50ef0xegua1skq.jpg",
      description: "Premier hotels and resorts in Islamabad, Lahore, Karachi, and other major cities."
    },
    {
      icon: <MapPin size={24} className="text-ocean-500" />,
      region: "Indonesia",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      description: "Luxury resorts and hotels in Bali, Jakarta, and other Indonesian destinations."
    },
    {
      icon: <MapPin size={24} className="text-ocean-500" />,
      region: "Mauritius",
      image: "https://res.cloudinary.com/dzwdsxj7s/image/upload/v1743277646/kaliber/lucnlgyvsbyoxknlrfl7.jpg",
      description: "Beach resorts and luxury hotels across this tropical island destination."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Ahmed",
      position: "Front Office Manager, Marriott Hotels",
      image: "https://images.unsplash.com/photo-1620503374956-c942862f0372?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      location: "Dubai, UAE",
      quote: "The Kaliber's CTH program opened doors for me internationally. Their placement support helped me secure a position at one of Dubai's finest hotels."
    },
    {
      name: "Hassan Khan",
      position: "Executive Chef, Hilton Hotels",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      location: "London, UK",
      quote: "The culinary training I received was world-class. The hands-on experience prepared me for the demands of international kitchens."
    },
    {
      name: "Ayesha Malik",
      position: "Events Coordinator, Hyatt Regency",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      location: "Riyadh, Saudi Arabia",
      quote: "From classroom to career, The Kaliber supported me at every step. Their industry connections helped me find my dream job."
    }
  ];

  const partners = [
    "Marriott International",
    "Hilton Worldwide",
    "IHG Hotels & Resorts",
    "Accor Group",
    "Rotana Hotels",
    "Jumeirah Group"
  ];

  const partnershipBenefits = [
    "Guaranteed internship opportunities",
    "Direct recruitment pathways",
    "Global career mobility"
  ];

  return (
    <section id="placement" className="py-24 bg-gradient-to-b from-ocean-50 to-white">
      <div className="section-container" ref={sectionRef}>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="reveal opacity-0">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-ocean-100 text-ocean-800 uppercase tracking-wide">
                Job Placement
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-3 tracking-tight text-ocean-500">
                Your Gateway to Global Career Opportunities
              </h2>
              <p className="text-ocean-600 mb-8">
                Beyond providing exceptional education, we take pride in connecting our graduates with 
                exciting job opportunities across UK, Ireland, USA, Middle East, South East Asia and Central Asia. 
                Our extensive network of industry partners ensures that your career journey begins on the right foot.
              </p>
            </div>

            <div className="reveal opacity-0" style={{ transitionDelay: "0.1s" }}>
              <div className="flex items-start mb-6 transform hover:translate-x-2 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-ocean-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <Briefcase size={18} className="text-ocean-500" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-ocean-800 mb-1">Personalized Placement Support</h3>
                  <p className="text-ocean-600 text-sm">
                    Our dedicated placement team works with each graduate individually to match their skills, 
                    interests, and career goals with the perfect employment opportunity.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start mb-6 transform hover:translate-x-2 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-ocean-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <Building size={18} className="text-ocean-500" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-ocean-800 mb-1">Industry Partnerships</h3>
                  <p className="text-ocean-600 text-sm">
                    We've established strong relationships with leading hospitality brands worldwide 
                    by giving our graduates preferred access to exciting career opportunities.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start transform hover:translate-x-2 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-ocean-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <Users size={18} className="text-ocean-500" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-ocean-800 mb-1">Ongoing Career Support</h3>
                  <p className="text-ocean-600 text-sm">
                    Our commitment to your success doesn't end with placement. We provide continued 
                    guidance and support as you progress through your hospitality career.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="reveal opacity-0" style={{ transitionDelay: "0.2s" }}>
            <AspectRatio ratio={4/3} className="rounded-xl overflow-hidden">
              <img 
                src="https://res.cloudinary.com/dzwdsxj7s/image/upload/v1743265281/kaliber/ohlvdfenqhhdwqoazjdr.jpg"
                alt="Global career opportunities" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </AspectRatio>
          </div>
        </div>

        <div className="reveal opacity-0 mb-20">
          <h3 className="text-2xl font-display font-semibold text-ocean-500 mb-8 text-center">Industry Placement Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {partners.map((partner, index) => (
              <div key={index} className="glassmorphism-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 p-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-ocean-500 text-3xl mb-2">🏨</div>
                  <h4 className="font-medium text-ocean-800 text-sm">{partner}</h4>
                </div>
              </div>
            ))}
          </div>
          
          <div className="glassmorphism-card rounded-xl p-6">
            <p className="text-ocean-700 mb-4 text-center">These partnerships allow us to provide:</p>
            <div className="grid md:grid-cols-3 gap-4">
              {partnershipBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center bg-ocean-50 p-3 rounded-lg">
                  <CheckCircle size={20} className="text-ocean-500 mr-2 flex-shrink-0" />
                  <span className="text-ocean-700 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal opacity-0 mb-20">
          <h3 className="text-2xl font-display font-semibold text-ocean-500 mb-8 text-center">Placement Destinations</h3>
          
          <div className="relative">
            {/* Replace ScrollArea with simple div for more control */}
            <div className="w-full overflow-x-auto pb-4" ref={scrollContainerRef} style={{ scrollBehavior: 'smooth' }}>
              <div className="flex space-x-4">
                {locations.map((location, index) => (
                  <div 
                    key={index} 
                    className="glassmorphism-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 flex-shrink-0"
                    style={{ width: "240px" }}
                  >
                    <AspectRatio ratio={1/1} className="bg-ocean-50">
                      <img 
                        src={location.image} 
                        alt={location.region} 
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-ocean-100 flex items-center justify-center mr-2 flex-shrink-0">
                          {location.icon}
                        </div>
                        <h4 className="font-display font-medium text-ocean-800">{location.region}</h4>
                      </div>
                      <p className="text-ocean-600 text-xs">{location.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-4 gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full"
                onClick={handleScrollLeft}
                disabled={!canScrollLeft}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Scroll left</span>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full"
                onClick={handleScrollRight}
                disabled={!canScrollRight}
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Scroll right</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="reveal opacity-0">
          <h3 className="text-2xl font-display font-semibold text-ocean-500 mb-8 text-center">Success Stories</h3>
          <Carousel 
            opts={{ loop: true, align: "start" }}
            className="mx-auto"
            setApi={setCarouselApi}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="glassmorphism-card rounded-xl overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:scale-105 mx-2">
                    <div className="flex flex-col h-full">
                      <div className="p-6 flex-grow">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-display font-medium text-ocean-800">{testimonial.name}</h4>
                            <p className="text-ocean-600 text-xs">{testimonial.position}</p>
                          </div>
                        </div>
                        <p className="text-ocean-700 italic text-sm">"{testimonial.quote}"</p>
                      </div>
                      <div className="p-3 bg-ocean-50 flex items-center">
                        <MapPin size={14} className="text-ocean-500 mr-1" />
                        <span className="text-ocean-600 text-xs">{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
          
          <div className="text-center mt-12">
            <a 
              href="#apply" 
              className="inline-block bg-ocean-500 text-white px-6 py-3 rounded-md font-medium hover:bg-ocean-600 transition-all-200 transform hover:scale-105"
            >
              Start Your International Career
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Placement;
