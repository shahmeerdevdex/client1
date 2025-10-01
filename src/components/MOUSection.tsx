import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MOU {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  video_url: string | null;
  document_url: string | null;
  is_active: boolean;
}

const MOUSection = () => {
  const [mous, setMous] = useState<MOU[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveMOUs();
  }, []);

  const fetchActiveMOUs = async () => {
    try {
      const { data, error } = await supabase
        .from("mous")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      setMous(data || []);
    } catch (error) {
      console.error("Error fetching MOUs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Loading MOUs...</div>
          </div>
        </div>
      </section>
    );
  }

  if (mous.length === 0) {
    return null; // Don't show the section if no MOUs are available
  }

  const MOUDetailModal = ({ mou }: { mou: MOU }) => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">{mou.title}</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {mou.image_url && (
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src={mou.image_url}
              alt={mou.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Description</h3>
          <p className="text-gray-600 leading-relaxed">{mou.description}</p>
        </div>

        {mou.video_url && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Video</h3>
            <div className="aspect-video rounded-lg overflow-hidden">
              <video
                controls
                className="w-full h-full"
                poster={mou.image_url || undefined}
              >
                <source src={mou.video_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}

        {mou.document_url && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Document</h3>
            <Button
              asChild
              variant="outline"
              className="w-full"
            >
              <a
                href={mou.document_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <FileText className="h-4 w-4" />
                View Document
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </DialogContent>
  );

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Partnerships & MOUs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Strategic collaborations that strengthen our educational programs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mous.map((mou) => (
            <Dialog key={mou.id}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-3">
                  {mou.image_url && (
                    <div className="aspect-video rounded-lg overflow-hidden mb-3">
                      <img
                        src={mou.image_url}
                        alt={mou.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardTitle className="text-lg font-semibold line-clamp-2">
                    {mou.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {mou.description}
                  </p>
                  
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group"
                    >
                      <Eye className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                      View Details
                    </Button>
                  </DialogTrigger>
                </CardContent>
              </Card>
              
              <MOUDetailModal mou={mou} />
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MOUSection;