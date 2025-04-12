
import React from "react";
import { X } from "lucide-react";
import { useEnrollment } from "@/context/EnrollmentContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const EnrollmentForm = () => {
  const { isFormOpen, closeForm, selectedCourse, isSubmitting, submitEnrollment } = useEnrollment();
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await submitEnrollment(formData);
  };

  return (
    <Sheet open={isFormOpen} onOpenChange={closeForm}>
      <SheetContent className="w-full md:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold text-kalibre-800">
            Enroll in Course
          </SheetTitle>
          <SheetDescription>
            {selectedCourse ? `You're applying for: ${selectedCourse}` : 'Complete the form to enroll'}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-8">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="courseName" value={selectedCourse || ''} />
            
            <div className="space-y-2">
              <Label htmlFor="name" className="text-kalibre-700">Full Name*</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="Enter your full name" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address" className="text-kalibre-700">Address*</Label>
              <Textarea 
                id="address" 
                name="address" 
                placeholder="Enter your full address" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-kalibre-700">Date of Birth*</Label>
              <Input 
                id="dateOfBirth" 
                name="dateOfBirth" 
                type="date" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-kalibre-700">Email*</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="name@example.com" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mobile" className="text-kalibre-700">Mobile Number*</Label>
              <Input 
                id="mobile" 
                name="mobile" 
                type="tel" 
                placeholder="Your mobile number" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cv" className="text-kalibre-700">Upload CV (Optional)</Label>
              <Input 
                id="cv" 
                name="cv" 
                type="file" 
                accept=".pdf,.doc,.docx"
              />
              <p className="text-sm text-muted-foreground">Accepted formats: PDF, DOC, DOCX</p>
            </div>
            
            <div className="pt-4 flex justify-end space-x-4">
              <SheetClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </SheetClose>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-kalibre-700 hover:bg-kalibre-800 text-white"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EnrollmentForm;
