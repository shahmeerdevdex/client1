-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  level TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create policies for courses
CREATE POLICY "Anyone can view active courses" 
ON public.courses 
FOR SELECT 
USING (is_active = true OR true);

CREATE POLICY "Anyone can insert courses" 
ON public.courses 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update courses" 
ON public.courses 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete courses" 
ON public.courses 
FOR DELETE 
USING (true);

-- Create MOUs table
CREATE TABLE public.mous (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  video_url TEXT,
  document_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security for MOUs
ALTER TABLE public.mous ENABLE ROW LEVEL SECURITY;

-- Create policies for MOUs
CREATE POLICY "Anyone can view active mous" 
ON public.mous 
FOR SELECT 
USING (is_active = true OR true);

CREATE POLICY "Anyone can insert mous" 
ON public.mous 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update mous" 
ON public.mous 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete mous" 
ON public.mous 
FOR DELETE 
USING (true);

-- Create storage buckets for MOU media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('mou-media', 'mou-media', true);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('course-images', 'course-images', true);

-- Create storage policies for MOU media
CREATE POLICY "Anyone can upload MOU media" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'mou-media');

CREATE POLICY "Anyone can view MOU media" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'mou-media');

CREATE POLICY "Anyone can update MOU media" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'mou-media');

CREATE POLICY "Anyone can delete MOU media" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'mou-media');

-- Create storage policies for course images
CREATE POLICY "Anyone can upload course images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'course-images');

CREATE POLICY "Anyone can view course images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'course-images');

CREATE POLICY "Anyone can update course images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'course-images');

CREATE POLICY "Anyone can delete course images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'course-images');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mous_updated_at
BEFORE UPDATE ON public.mous
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();