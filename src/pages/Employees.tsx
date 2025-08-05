import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  const [employees, setEmployees] = useState(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    jobTitle: '',
    workLocation: '',
    dateOfJoining: ''
  });
  const { toast } = useToast();

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmployee(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    
    const employee = {
      id: Date.now().toString(),
      ...newEmployee,
      isActive: true
    };

    setEmployees(prev => [...prev, employee]);
    setNewEmployee({
      name: '',
      email: '',
      phone: '',
      address: '',
      jobTitle: '',
      workLocation: '',
      dateOfJoining: ''
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Employee Added",
      description: `${employee.name} has been successfully added.`,
    });
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    toast({
      title: "Employee Removed",
      description: "Employee has been successfully removed.",
    });
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
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>
                Fill in the employee details below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter full name"
                    value={newEmployee.name}
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
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    name="address"
                    placeholder="Enter address"
                    value={newEmployee.address}
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
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <CardDescription>{employee.jobTitle}</CardDescription>
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
                  <span className="text-muted-foreground">{employee.email}</span>
                </div>
                {employee.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{employee.phone}</span>
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 text-destructive hover:text-destructive"
                  onClick={() => handleDeleteEmployee(employee.id)}
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </Button>
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