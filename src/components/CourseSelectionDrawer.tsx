import React, { useEffect, useState } from "react";
import { X, GraduationCap, Clock, Award } from "lucide-react";
import { useEnrollment } from "@/context/EnrollmentContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Course {
  id: string;
  name: string;
  description: string | null;
  duration: string | null;
  level: string | null;
  image_url: string | null;
  is_active: boolean;
}

const CourseSelectionDrawer = () => {
  const { isCourseSelectionOpen, closeCourseSelection, openForm } = useEnrollment();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isCourseSelectionOpen) {
      fetchCourses();
    }
  }, [isCourseSelectionOpen]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
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

  const getDefaultImage = () =>
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

  const handleCourseSelect = (courseName: string) => {
    openForm(courseName);
  };

  return (
    <Sheet open={isCourseSelectionOpen} onOpenChange={closeCourseSelection}>
      <SheetContent className="w-full md:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold text-kaliber-800">
            Select a Course
          </SheetTitle>
          <SheetDescription>
            Choose from our available courses to start your enrollment process
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse">Loading courses...</div>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No courses available at the moment.</p>
              <p className="text-sm mt-2">Please check back later.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="glassmorphism-card rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer border border-white/20 hover:border-kaliber-200/50"
                  onClick={() => handleCourseSelect(course.name)}>
                  <div className="flex items-center gap-4">
                    {/* Left side: Course Image */}
                    <div className="w-1/4 flex-shrink-0">
                      <AspectRatio
                        ratio={16 / 9}
                        className="w-full h-20 rounded-lg overflow-hidden bg-kaliber-100 shadow-sm">
                        <img
                          src={course.image_url || getDefaultImage()}
                          alt={course.name}
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    </div>

                    {/* Right side: Course Details */}
                    <div className="flex-grow min-w-0">
                      <h3 className="text-base font-semibold text-kaliber-900 mb-1 truncate">
                        {course.name}
                      </h3>

                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {course.level && (
                          <span className="bg-kaliber-100 text-kaliber-800 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                            <Award size={10} className="mr-1" />
                            {course.level}
                          </span>
                        )}
                        {course.duration && (
                          <span className="bg-kaliber-50 text-kaliber-700 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                            <Clock size={10} className="mr-1" />
                            {course.duration}
                          </span>
                        )}
                      </div>

                      {/* Description (Optional) */}
                      <p className="text-kaliber-600 text-xs mb-3 line-clamp-2">
                        {course.description || "Course description coming soon..."}
                      </p>

                      <Button
                        variant="outline"
                        size="sm"
                        className="text-kaliber-700 border-kaliber-300 hover:bg-kaliber-50 text-xs px-3 py-1 h-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCourseSelect(course.name);
                        }}>
                        <GraduationCap size={12} className="mr-1" />
                        Enroll
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CourseSelectionDrawer;
