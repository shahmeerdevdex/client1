-- Create enrollments table
CREATE TABLE public.enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  cv_url TEXT,
  course_name TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access (since this is an admin-managed table)
CREATE POLICY "Anyone can insert enrollments" 
ON public.enrollments 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view enrollments" 
ON public.enrollments 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update enrollments" 
ON public.enrollments 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete enrollments" 
ON public.enrollments 
FOR DELETE 
USING (true);

-- Create storage bucket for CVs
INSERT INTO storage.buckets (id, name, public) 
VALUES ('cvs', 'cvs', true);

-- Create storage policies for CVs
CREATE POLICY "Anyone can upload CVs" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'cvs');

CREATE POLICY "Anyone can view CVs" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'cvs');

CREATE POLICY "Anyone can update CVs" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'cvs');

CREATE POLICY "Anyone can delete CVs" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'cvs');