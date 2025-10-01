import React, { useEffect, useRef } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { MapPin } from "lucide-react";

const Testimonials = () => {
  const [studentApi, setStudentApi] = React.useState<CarouselApi>();
  const [partnerApi, setPartnerApi] = React.useState<CarouselApi>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const partnerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (studentApi) {
      // Clear any existing interval
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      // Set up auto-scrolling for student testimonials
      intervalRef.current = setInterval(() => {
        if (studentApi.canScrollNext()) {
          studentApi.scrollNext();
        } else {
          studentApi.scrollTo(0);
        }
      }, 2000); // 2 seconds interval
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [studentApi]);

  useEffect(() => {
    if (partnerApi) {
      // Clear any existing interval
      if (partnerIntervalRef.current) clearInterval(partnerIntervalRef.current);
      
      // Set up auto-scrolling for partner testimonials
      partnerIntervalRef.current = setInterval(() => {
        if (partnerApi.canScrollNext()) {
          partnerApi.scrollNext();
        } else {
          partnerApi.scrollTo(0);
        }
      }, 2000); // 2 seconds interval
    }
    
    return () => {
      if (partnerIntervalRef.current) clearInterval(partnerIntervalRef.current);
    };
  }, [partnerApi]);

  const studentTestimonials = [
    {
      quote: "Kaliber's CTH program gave me the skills and confidence to excel. I'm now a Front Office Manager at a luxury hotel in Dubai!",
      name: "Sarah K.",
      position: "Front Office Manager",
      location: "Dubai"
    },
    {
      quote: "The earn-while-you-learn model was perfect for me. I graduated debt-free with 2 years of experience at a 5-star London hotel.",
      name: "James L.",
      position: "Restaurant Supervisor",
      location: "London"
    },
    {
      quote: "From a small village in Pakistan to working at the Burj Al Arab – Kaliber made my dreams possible!",
      name: "Ali R.",
      position: "Butler Service",
      location: "Dubai"
    },
    {
      quote: "The industry placements were invaluable. I got hired full-time by the same hotel where I did my training.",
      name: "Elena M.",
      position: "Housekeeping Manager",
      location: "Riyadh, Saudi Arabia"
    },
    {
      quote: "Kaliber's connections got me interviews with top hotel chains. I had three job offers before graduation!",
      name: "David W.",
      position: "Revenue Analyst",
      location: "Marriott"
    },
    {
      quote: "The chef instructors were amazing. I went from kitchen trainee to Junior Sous Chef in just 18 months.",
      name: "Priya S.",
      position: "Junior Sous Chef",
      location: "Qatar"
    },
    {
      quote: "I was hesitant about hospitality, but Kaliber's career guidance helped me find my passion in event management.",
      name: "Omar F.",
      position: "Event Coordinator",
      location: "Saudi Arabia"
    },
    {
      quote: "Best decision ever! The combination of UK certification and Middle East experience made me highly employable.",
      name: "Aisha B.",
      position: "Guest Relations Manager",
      location: "Abu Dhabi"
    }
  ];

  const partnerTestimonials = [
    {
      quote: "Kaliber graduates are our first choice. They arrive job-ready with the right skills and attitude.",
      name: "HR Director",
      company: "Hilton London Metropole"
    },
    {
      quote: "We've recruited over 120 staff through Kaliber in the past 3 years. Their screening process is exceptional.",
      name: "General Manager",
      company: "InterContinental Dubai Festival City"
    },
    {
      quote: "The quality of Kaliber's culinary students is outstanding. Many have become key members of our kitchen team.",
      name: "Executive Chef",
      company: "The Ritz-Carlton, Bahrain"
    },
    {
      quote: "Our partnership with Kaliber solves our seasonal staffing challenges with well-trained professionals.",
      name: "Operations Manager",
      company: "Swissôtel, Makkah Saudi Arabia"
    },
    {
      quote: "Kaliber understands our specific needs. They've helped us build an entire front office team within weeks.",
      name: "Director of Rooms",
      company: "Jumeirah Emirates Towers"
    },
    {
      quote: "Their students' language skills and cultural awareness make them perfect for our luxury resorts.",
      name: "Recruitment Manager",
      company: "Four Seasons Maldives"
    },
    {
      quote: "We appreciate how Kaliber prepares students for the realities of hotel operations. Minimal training needed.",
      name: "VP of HR",
      company: "Rotana Hotels, Middle East"
    },
    {
      quote: "The only training provider we trust for our management trainee program. Consistently excellent candidates.",
      name: "Talent Acquisition",
      company: "AccorHotels, Europe"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-primary/10 text-primary uppercase tracking-wide">
            Testimonials
          </span>
          <h2 className="section-heading">
            Success Stories: What Our Students & Partners Say
          </h2>
        </div>
        
        <div className="mb-16">
          <h3 className="text-xl font-display font-semibold text-primary mb-8 text-center">
            Student Testimonials
          </h3>
          
          <Carousel 
            opts={{ loop: true, align: "start" }}
            className="mx-auto"
            setApi={setStudentApi}
          >
            <CarouselContent>
              {studentTestimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="glassmorphism-card rounded-xl overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:scale-105 mx-2">
                    <div className="flex flex-col h-full">
                      <div className="p-6 flex-grow">
                        <div className="text-3xl text-primary/60 mb-4">🎤</div>
                        <p className="text-kaliber-700 italic text-sm mb-4">"{testimonial.quote}"</p>
                        <div>
                          <h4 className="font-medium text-kaliber-900">— {testimonial.name}</h4>
                          <p className="text-kaliber-600 text-xs">{testimonial.position}</p>
                        </div>
                      </div>
                      <div className="p-3 bg-primary/5 flex items-center">
                        <MapPin size={14} className="text-primary mr-1" />
                        <span className="text-kaliber-600 text-xs">{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
        
        <div>
          <h3 className="text-xl font-display font-semibold text-primary mb-8 text-center">
            Industry Partner Testimonials
          </h3>
          
          <Carousel 
            opts={{ loop: true, align: "start" }}
            className="mx-auto"
            setApi={setPartnerApi}
          >
            <CarouselContent>
              {partnerTestimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="glassmorphism-card rounded-xl overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:scale-105 mx-2">
                    <div className="flex flex-col h-full">
                      <div className="p-6 flex-grow">
                        <div className="text-3xl text-primary/60 mb-4">🏨</div>
                        <p className="text-kaliber-700 italic text-sm mb-4">"{testimonial.quote}"</p>
                        <div>
                          <h4 className="font-medium text-kaliber-900">— {testimonial.name}</h4>
                          <p className="text-kaliber-600 text-xs">{testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
