import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Plus, 
  Search, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Building, 
  Calendar,
  Edit,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { employeesApi } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Employee {
  id: string;
  fullName: string | null;
  email: string;
  phoneNumber: string | null;
  profileImageUrl: string | null;
  jobTitle: string | null;
  workLocation: string | null;
  dateOfJoining: string | null;
  role: string;
  otp: string | null;
  isverified: boolean;
  isActive: boolean;
  nationalIdNumber: string | null;
  passportNumber: string | null;
  stcPayNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

// Mock employee data
const mockEmployees = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY',
    jobTitle: 'Software Engineer',
    workLocation: 'New York Office',
    dateOfJoining: '2023-01-15',
    isActive: true
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Ave, Los Angeles, CA',
    jobTitle: 'Product Manager',
    workLocation: 'Los Angeles Office',
    dateOfJoining: '2022-08-20',
    isActive: true
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike.wilson@company.com',
    phone: '+1 (555) 345-6789',
    address: '789 Pine St, Chicago, IL',
    jobTitle: 'UI/UX Designer',
    workLocation: 'Chicago Office',
    dateOfJoining: '2023-03-10',
    isActive: false
  }
];

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    employeeName: '',
    email: '',
    role: 'employee',
    phone: '',
    phoneNumber: '',
    jobTitle: '',
    workLocation: '',
    dateOfJoining: ''
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'superAdmin';

  // Fetch employees on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await employeesApi.getAllEmployees('employee');
        setEmployees(response.allEmployeeList || []);
      } catch (error) {
        console.error('Error fetching employees:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch employees',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchEmployees();
  }, [toast]);

  const filteredEmployees = employees.filter(employee =>
    (employee.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (employee.jobTitle || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmployee(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append('employeeName', newEmployee.employeeName);
      formData.append('email', newEmployee.email);
      formData.append('phoneNumber', newEmployee.phoneNumber || newEmployee.phone);
      formData.append('jobTitle', newEmployee.jobTitle);
      formData.append('workLocation', newEmployee.workLocation);
      formData.append('dateOfJoining', newEmployee.dateOfJoining);
      formData.append('role', newEmployee.role);
      
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }
      
      const response = await employeesApi.addNewEmployee(formData);
      
      // Refresh the employee list
      const updatedResponse = await employeesApi.getAllEmployees('employee');
      setEmployees(updatedResponse.allEmployeeList || []);
      
      // Reset form
      setNewEmployee({
        employeeName: '',
        email: '',
        role: 'employee',
        phone: '',
        phoneNumber: '',
        jobTitle: '',
        workLocation: '',
        dateOfJoining: ''
      });
      setProfileImage(null);
      setIsAddDialogOpen(false);
      
      const roleText = newEmployee.role === 'admin' ? 'Admin' : 'Employee';
      toast({
        title: `${roleText} Added`,
        description: `${response.employeeInfo?.fullName || newEmployee.employeeName} has been successfully added as ${roleText.toLowerCase()}.`,
      });
    } catch (error: any) {
      console.error('Error creating employee:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || 'Failed to create employee',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (id: string, employeeName: string) => {
    try {
      setLoading(true);
      await employeesApi.delete(id);
      
      // Remove employee from local state
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      
      toast({
        title: "Employee Deleted",
        description: `${employeeName} has been successfully removed from the system.`,
      });
    } catch (error: any) {
      console.error('Error deleting employee:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || 'Failed to delete employee. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employees</h1>
          <p className="text-muted-foreground">Manage your organization's employees</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {isSuperAdmin ? 'Add User' : 'Add Employee'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isSuperAdmin ? 'Add New User' : 'Add New Employee'}</DialogTitle>
              <DialogDescription>
                {isSuperAdmin ? 'Fill in the user details below. You can create both admin and employee users.' : 'Fill in the employee details below.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employeeName">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="employeeName"
                    name="employeeName"
                    placeholder="Enter full name"
                    value={newEmployee.employeeName}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={newEmployee.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>



              {isSuperAdmin && (
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select
                    value={newEmployee.role}
                    onValueChange={(value) => setNewEmployee(prev => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Image</Label>
                <Input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Enter phone number"
                    value={newEmployee.phone}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>



              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    placeholder="Enter job title"
                    value={newEmployee.jobTitle}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workLocation">Work Location</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="workLocation"
                    name="workLocation"
                    placeholder="Enter work location"
                    value={newEmployee.workLocation}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfJoining">Date of Joining</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dateOfJoining"
                    name="dateOfJoining"
                    type="date"
                    value={newEmployee.dateOfJoining}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  Save Employee
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-custom-md transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {(employee.fullName || employee.email).split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{employee.fullName || employee.email}</CardTitle>
                    <CardDescription>{employee.jobTitle || 'No job title'}</CardDescription>
                  </div>
                </div>
                <Badge variant={employee.isActive ? 'default' : 'secondary'}>
                  {employee.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{employee.email}</span>
                </div>
                {employee.phoneNumber && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{employee.phoneNumber}</span>
                  </div>
                )}
                {employee.workLocation && (
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{employee.workLocation}</span>
                  </div>
                )}
                {employee.dateOfJoining && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Joined {new Date(employee.dateOfJoining).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2 text-destructive hover:text-destructive"
                      disabled={loading}
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete <strong>{employee.fullName || employee.email}</strong>? 
                        This action cannot be undone and will permanently remove the employee from the system.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDeleteEmployee(employee.id, employee.fullName || employee.email)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete Employee
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No employees found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Try adjusting your search criteria.' : 'Add your first employee to get started.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Employees;