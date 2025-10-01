import React, { useEffect, useRef, useState } from "react";
import { GraduationCap, Clock, Award, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useEnrollment } from "@/context/EnrollmentContext";

interface Course {
  id: string;
  name: string;
  description: string | null;
  duration: string | null;
  level: string | null;
  image_url: string | null;
  is_active: boolean;
}

const Courses = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const carouselApi = React.useRef<any>(null);
  const { openForm, openCourseSelection } = useEnrollment();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

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
  }, [courses]);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const getDefaultImage = () =>
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

  if (loading) {
    return (
      <section id="courses" className="py-16 md:py-20">
        <div className="section-container">
          <div className="text-center">
            <div className="animate-pulse">Loading courses...</div>
          </div>
        </div>
      </section>
    );
  }

  if (courses.length === 0) {
    return (
      <section id="courses" className="py-16 md:py-20">
        <div className="section-container">
          <div className="text-center">
            <h2 className="section-heading">No Courses Available</h2>
            <p className="section-subheading">Please check back later for available courses.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="courses" className="py-16 md:py-20">
      <div className="section-container" ref={sectionRef}>
        <div className="text-center mb-12">
          <div className="reveal opacity-0">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-kaliber-100 text-kaliber-800 uppercase tracking-wide">
              Our Programs
            </span>
            <h2 className="section-heading">Internationally Recognized Courses</h2>
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
            }}>
            <CarouselContent>
              {courses.map((course, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/3">
                  <div className="p-1 h-full">
                    <div className="glassmorphism-card rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col hover:shadow-lg hover:translate-y-[-8px]">
                      <AspectRatio ratio={16 / 9} className="bg-kaliber-100 overflow-hidden">
                        <img
                          src={course.image_url || getDefaultImage()}
                          alt={course.name}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                      </AspectRatio>
                      <div className="h-2 bg-kaliber-700"></div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-kaliber-900">
                              {course.name}
                            </h3>
                            <div className="flex items-center mt-2">
                              {course.level && (
                                <span className="bg-kaliber-100 text-kaliber-800 text-xs px-2 py-1 rounded font-medium flex items-center">
                                  <Award size={14} className="mr-1" />
                                  {course.level}
                                </span>
                              )}
                              {course.duration && (
                                <span className="bg-kaliber-50 text-kaliber-700 text-xs px-2 py-1 rounded font-medium ml-2 flex items-center">
                                  <Clock size={14} className="mr-1" />
                                  {course.duration}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-kaliber-100 flex items-center justify-center">
                            <GraduationCap size={20} className="text-kaliber-800" />
                          </div>
                        </div>

                        <p className="text-kaliber-600 text-sm mb-4 flex-grow">
                          {course.description || "Course description coming soon..."}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                          <a
                            href="#apply"
                            className="inline-flex items-center text-kaliber-800 font-medium hover:text-kaliber-600 transition-all-200 text-sm group">
                            Learn more
                            <ExternalLink
                              size={14}
                              className="ml-1 transform group-hover:translate-x-1 transition-transform"
                            />
                          </a>

                          <Button
                            variant="outline"
                            size="sm"
                            className="text-kaliber-700 border-kaliber-300 hover:bg-kaliber-50"
                            onClick={() => openForm(course.name)}>
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
            className="bg-kaliber-800 text-white px-6 py-3 rounded-md font-medium hover:bg-kaliber-700 transition-all-200 transform hover:scale-105"
            onClick={openCourseSelection}>
            Apply for a Course
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
