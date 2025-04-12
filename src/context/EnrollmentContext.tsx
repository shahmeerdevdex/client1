
import React, { createContext, useContext, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EnrollmentContextType {
  isFormOpen: boolean;
  openForm: (courseName: string) => void;
  closeForm: () => void;
  selectedCourse: string | null;
  isSubmitting: boolean;
  submitEnrollment: (formData: FormData) => Promise<void>;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export const useEnrollment = () => {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error("useEnrollment must be used within an EnrollmentProvider");
  }
  return context;
};

interface EnrollmentProviderProps {
  children: ReactNode;
}

export const EnrollmentProvider = ({ children }: EnrollmentProviderProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openForm = (courseName: string) => {
    setSelectedCourse(courseName);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedCourse(null);
  };

  const submitEnrollment = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      
      const name = formData.get("name") as string;
      const address = formData.get("address") as string;
      const dateOfBirth = formData.get("dateOfBirth") as string;
      const email = formData.get("email") as string;
      const mobile = formData.get("mobile") as string;
      const cvFile = formData.get("cv") as File | null;
      
      let cvUrl = null;
      
      // Upload CV if provided
      if (cvFile && cvFile.size > 0) {
        const fileExt = cvFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('cvs')
          .upload(filePath, cvFile);
          
        if (uploadError) {
          toast.error("Failed to upload CV");
          throw uploadError;
        }
        
        cvUrl = `${supabase.storage.from('cvs').getPublicUrl(filePath).data.publicUrl}`;
      }
      
      // Store enrollment in database
      const { error: insertError } = await supabase
        .from('enrollments')
        .insert({
          name,
          address,
          date_of_birth: dateOfBirth,
          email,
          mobile,
          cv_url: cvUrl,
          course_name: selectedCourse,
          status: 'pending'  // Ensure status is explicitly set
        });
        
      if (insertError) {
        toast.error("Failed to submit enrollment");
        throw insertError;
      }
      
      toast.success("Enrollment submitted successfully!");
      closeForm();
      
    } catch (error) {
      console.error("Enrollment submission error:", error);
      toast.error("Failed to submit enrollment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const value = {
    isFormOpen,
    openForm,
    closeForm,
    selectedCourse,
    isSubmitting,
    submitEnrollment
  };

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  );
};
