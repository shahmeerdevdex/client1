
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Download, Calendar, Edit, Trash2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { toast } from "sonner";
import { format } from "date-fns";
import { Navigate } from "react-router-dom";

interface Enrollment {
  id: string;
  name: string;
  address: string;
  date_of_birth: string;
  email: string;
  mobile: string;
  cv_url: string | null;
  course_name: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  
  // Check if admin is logged in
  useEffect(() => {
    const checkAuth = () => {
      const adminAuth = localStorage.getItem("admin_authenticated");
      setIsAuthenticated(adminAuth === "true");
    };
    
    checkAuth();
  }, []);
  
  // Fetch enrollments when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchEnrollments();
    }
  }, [isAuthenticated]);
  
  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      console.log("Fetching enrollments from Supabase...");
      
      const { data, error } = await supabase
        .from("enrollments")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (error) {
        console.error("Error fetching enrollments:", error);
        throw error;
      }
      
      console.log("Enrollments fetched:", data);
      setEnrollments(data || []);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      toast.error("Failed to load enrollments");
    } finally {
      setLoading(false);
    }
  };
  
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password authentication - in a real app, use proper authentication
    if (password === "admin123") {
      localStorage.setItem("admin_authenticated", "true");
      setIsAuthenticated(true);
      setLoginError(null);
    } else {
      setLoginError("Invalid password");
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
  };
  
  const updateEnrollmentStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("enrollments")
        .update({ status })
        .eq("id", id);
        
      if (error) throw error;
      
      setEnrollments(enrollments.map(enrollment => 
        enrollment.id === id ? { ...enrollment, status } : enrollment
      ));
      
      toast.success("Status updated successfully");
      setEditingId(null);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };
  
  const deleteEnrollment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enrollment?")) return;
    
    try {
      const { error } = await supabase
        .from("enrollments")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      
      setEnrollments(enrollments.filter(enrollment => enrollment.id !== id));
      toast.success("Enrollment deleted successfully");
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      toast.error("Failed to delete enrollment");
    }
  };
  
  const exportToCSV = () => {
    try {
      // Filter enrollments if filters are applied
      const dataToExport = filteredEnrollments.map(e => ({
        Name: e.name,
        Address: e.address,
        "Date of Birth": e.date_of_birth,
        Email: e.email,
        Mobile: e.mobile,
        "CV URL": e.cv_url || "Not provided",
        Course: e.course_name,
        Status: e.status,
        "Applied On": new Date(e.created_at).toLocaleDateString()
      }));
      
      if (dataToExport.length === 0) {
        toast.error("No data to export");
        return;
      }
      
      const headers = Object.keys(dataToExport[0]).join(',');
      const rows = dataToExport.map(obj => 
        Object.values(obj).map(value => 
          typeof value === 'string' && value.includes(',') ? `"${value}"` : value
        ).join(',')
      );
      
      const csv = [headers, ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `enrollments_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success("CSV exported successfully");
    } catch (error) {
      console.error("Error exporting to CSV:", error);
      toast.error("Failed to export data");
    }
  };
  
  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = 
      enrollment.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.course_name?.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = !statusFilter || enrollment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "waitlisted", label: "Waitlisted" },
    { value: "contacted", label: "Contacted" }
  ];

  // Login page rendering
  if (isAuthenticated === false) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-gray-600">Enter your password to access the admin panel</p>
          </div>
          
          <form onSubmit={handleAdminLogin} className="mt-8 space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            
            {loginError && (
              <div className="text-red-500 text-sm">{loginError}</div>
            )}
            
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse">Loading authentication status...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Course Enrollments</h1>
          <p className="text-muted-foreground">Manage all student applications</p>
        </div>
        
        <div className="flex gap-2 self-end">
          <Button 
            variant="default"
            onClick={exportToCSV}
          >
            <Download className="mr-2 h-4 w-4" />
            Export to CSV
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email or course..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter || "all"} onValueChange={val => setStatusFilter(val === "all" ? null : val)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse">Loading enrollments...</div>
          </div>
        ) : filteredEnrollments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No enrollment applications found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Applied On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnrollments.map(enrollment => (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-medium">{enrollment.name}</TableCell>
                    <TableCell>{enrollment.course_name}</TableCell>
                    <TableCell>{enrollment.email}</TableCell>
                    <TableCell>{formatDate(enrollment.created_at)}</TableCell>
                    <TableCell>
                      {editingId === enrollment.id ? (
                        <Select value={editStatus} onValueChange={setEditStatus}>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium
                          ${enrollment.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                          ${enrollment.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                          ${enrollment.status === 'pending' ? 'bg-blue-100 text-blue-800' : ''}
                          ${enrollment.status === 'waitlisted' ? 'bg-amber-100 text-amber-800' : ''}
                          ${enrollment.status === 'contacted' ? 'bg-purple-100 text-purple-800' : ''}
                        `}>
                          {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {editingId === enrollment.id ? (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateEnrollmentStatus(enrollment.id, editStatus)}
                            >
                              Save
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setEditingId(null)}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setEditingId(enrollment.id);
                                setEditStatus(enrollment.status);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => deleteEnrollment(enrollment.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
