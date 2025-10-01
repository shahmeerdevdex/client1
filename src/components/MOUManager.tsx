import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit, Trash2, Upload, Image, Video, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface MOU {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  video_url: string | null;
  document_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const MOUManager = () => {
  const [mous, setMous] = useState<MOU[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMOU, setEditingMOU] = useState<MOU | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    video_url: "",
    document_url: "",
    is_active: true
  });

  useEffect(() => {
    fetchMOUs();
  }, []);

  const fetchMOUs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("mous")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      setMous(data || []);
    } catch (error) {
      console.error("Error fetching MOUs:", error);
      toast.error("Failed to load MOUs");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'document') => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(type);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('mou-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('mou-media')
        .getPublicUrl(filePath);

      setFormData(prev => ({ 
        ...prev, 
        [`${type}_url`]: data.publicUrl 
      }));
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`);
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      toast.error(`Failed to upload ${type}`);
    } finally {
      setUploading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingMOU) {
        const { error } = await supabase
          .from("mous")
          .update(formData)
          .eq("id", editingMOU.id);
          
        if (error) throw error;
        toast.success("MOU updated successfully");
      } else {
        const { error } = await supabase
          .from("mous")
          .insert(formData);
          
        if (error) throw error;
        toast.success("MOU created successfully");
      }
      
      fetchMOUs();
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving MOU:", error);
      toast.error("Failed to save MOU");
    }
  };

  const handleEdit = (mou: MOU) => {
    setEditingMOU(mou);
    setFormData({
      title: mou.title,
      description: mou.description,
      image_url: mou.image_url || "",
      video_url: mou.video_url || "",
      document_url: mou.document_url || "",
      is_active: mou.is_active
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this MOU?")) return;
    
    try {
      const { error } = await supabase
        .from("mous")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      setMous(mous.filter(mou => mou.id !== id));
      toast.success("MOU deleted successfully");
    } catch (error) {
      console.error("Error deleting MOU:", error);
      toast.error("Failed to delete MOU");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image_url: "",
      video_url: "",
      document_url: "",
      is_active: true
    });
    setEditingMOU(null);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">MOU Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add MOU
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingMOU ? "Edit MOU" : "Add New MOU"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">MOU Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="image">Image</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'image')}
                    disabled={uploading === 'image'}
                  />
                  {uploading === 'image' && <span className="text-sm text-muted-foreground">Uploading...</span>}
                </div>
                {formData.image_url && (
                  <div className="mt-2">
                    <img 
                      src={formData.image_url} 
                      alt="MOU preview" 
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="video">Video</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    id="video"
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e, 'video')}
                    disabled={uploading === 'video'}
                  />
                  {uploading === 'video' && <span className="text-sm text-muted-foreground">Uploading...</span>}
                </div>
                {formData.video_url && (
                  <div className="mt-2 text-sm text-green-600">
                    ✓ Video uploaded
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="document">Document</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    id="document"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'document')}
                    disabled={uploading === 'document'}
                  />
                  {uploading === 'document' && <span className="text-sm text-muted-foreground">Uploading...</span>}
                </div>
                {formData.document_url && (
                  <div className="mt-2 text-sm text-green-600">
                    ✓ Document uploaded
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingMOU ? "Update" : "Create"} MOU
                </Button>
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse">Loading MOUs...</div>
        </div>
      ) : mous.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No MOUs found. Create your first MOU!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Media</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mous.map(mou => (
                <TableRow key={mou.id}>
                  <TableCell className="font-medium">{mou.title}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {mou.image_url && (
                        <div className="flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          <Image className="h-3 w-3" />
                          Image
                        </div>
                      )}
                      {mou.video_url && (
                        <div className="flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          <Video className="h-3 w-3" />
                          Video
                        </div>
                      )}
                      {mou.document_url && (
                        <div className="flex items-center gap-1 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          <FileText className="h-3 w-3" />
                          Doc
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      mou.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {mou.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(mou.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(mou)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(mou.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default MOUManager;