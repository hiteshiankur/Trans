import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  FileText,
  Image,
  Upload,
  X,
  Search
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for employees
const mockEmployees = [
  { id: '1', name: 'John Smith', email: 'john.smith@company.com', jobTitle: 'Software Engineer' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@company.com', jobTitle: 'Product Manager' },
  { id: '3', name: 'Mike Wilson', email: 'mike.wilson@company.com', jobTitle: 'UI/UX Designer' },
  { id: '4', name: 'Emily Davis', email: 'emily.davis@company.com', jobTitle: 'HR Manager' },
  { id: '5', name: 'David Brown', email: 'david.brown@company.com', jobTitle: 'Marketing Lead' },
];

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    eventName: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    banner: null as File | null,
    contract: null as File | null
  });

  const [selectedHRs, setSelectedHRs] = useState<string[]>([]);
  const [selectedInvitees, setSelectedInvitees] = useState<string[]>([]);
  const [hrSearch, setHrSearch] = useState('');
  const [inviteeSearch, setInviteeSearch] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'banner' | 'contract') => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleHRSelection = (employeeId: string) => {
    setSelectedHRs(prev => {
      if (prev.includes(employeeId)) {
        return prev.filter(id => id !== employeeId);
      } else {
        return [...prev, employeeId];
      }
    });
  };

  const handleInviteeSelection = (employeeId: string) => {
    // Don't allow selecting HRs as invitees
    if (selectedHRs.includes(employeeId)) return;
    
    setSelectedInvitees(prev => {
      if (prev.includes(employeeId)) {
        return prev.filter(id => id !== employeeId);
      } else {
        return [...prev, employeeId];
      }
    });
  };

  const getAvailableEmployees = () => {
    return mockEmployees.filter(emp => !selectedHRs.includes(emp.id));
  };

  const filteredHRs = mockEmployees.filter(emp => 
    emp.name.toLowerCase().includes(hrSearch.toLowerCase()) ||
    emp.email.toLowerCase().includes(hrSearch.toLowerCase())
  );

  const filteredInvitees = getAvailableEmployees().filter(emp => 
    emp.name.toLowerCase().includes(inviteeSearch.toLowerCase()) ||
    emp.email.toLowerCase().includes(inviteeSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.eventName || !formData.startDate || !formData.startTime) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create event logic would go here
    toast({
      title: "Event Created",
      description: `${formData.eventName} has been successfully created.`,
    });
    
    navigate('/events');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create Event</h1>
        <p className="text-muted-foreground">Set up a new event for your organization</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Event Information */}
        <Card>
          <CardHeader>
            <CardTitle>Event Information</CardTitle>
            <CardDescription>Basic details about your event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventName">Event Name *</Label>
              <Input
                id="eventName"
                name="eventName"
                placeholder="Enter event name"
                value={formData.eventName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="pl-10"
                    min={formData.startDate}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  name="location"
                  placeholder="Enter event location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your event..."
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* HR Selection */}
        <Card>
          <CardHeader>
            <CardTitle>HR Assignment</CardTitle>
            <CardDescription>Select employees to manage this event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees for HR role..."
                value={hrSearch}
                onChange={(e) => setHrSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {selectedHRs.length > 0 && (
              <div className="space-y-2">
                <Label>Selected HRs</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedHRs.map(hrId => {
                    const hr = mockEmployees.find(emp => emp.id === hrId);
                    return hr ? (
                      <Badge key={hrId} variant="default" className="gap-2">
                        {hr.name}
                        <X 
                          className="w-3 h-3 cursor-pointer" 
                          onClick={() => handleHRSelection(hrId)}
                        />
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            <div className="max-h-48 overflow-y-auto space-y-2">
              {filteredHRs.map(employee => (
                <div 
                  key={employee.id} 
                  className="flex items-center space-x-2 p-2 hover:bg-muted rounded-lg cursor-pointer"
                  onClick={() => handleHRSelection(employee.id)}
                >
                  <Checkbox 
                    checked={selectedHRs.includes(employee.id)}
                    onChange={() => handleHRSelection(employee.id)}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-sm text-muted-foreground">{employee.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Invitees Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Invitees</CardTitle>
            <CardDescription>Select employees to invite to this event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees to invite..."
                value={inviteeSearch}
                onChange={(e) => setInviteeSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {selectedInvitees.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Invitees ({selectedInvitees.length})</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedInvitees.slice(0, 10).map(inviteeId => {
                    const invitee = mockEmployees.find(emp => emp.id === inviteeId);
                    return invitee ? (
                      <Badge key={inviteeId} variant="secondary" className="gap-2">
                        {invitee.name}
                        <X 
                          className="w-3 h-3 cursor-pointer" 
                          onClick={() => handleInviteeSelection(inviteeId)}
                        />
                      </Badge>
                    ) : null;
                  })}
                  {selectedInvitees.length > 10 && (
                    <Badge variant="outline">+{selectedInvitees.length - 10} more</Badge>
                  )}
                </div>
              </div>
            )}

            <div className="max-h-48 overflow-y-auto space-y-2">
              {filteredInvitees.map(employee => (
                <div 
                  key={employee.id} 
                  className="flex items-center space-x-2 p-2 hover:bg-muted rounded-lg cursor-pointer"
                  onClick={() => handleInviteeSelection(employee.id)}
                >
                  <Checkbox 
                    checked={selectedInvitees.includes(employee.id)}
                    onChange={() => handleInviteeSelection(employee.id)}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-sm text-muted-foreground">{employee.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* File Uploads */}
        <Card>
          <CardHeader>
            <CardTitle>Files</CardTitle>
            <CardDescription>Upload event banner and contract files</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="banner">Event Banner</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Image className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload an image for your event banner
                </p>
                <Input
                  id="banner"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'banner')}
                  className="hidden"
                />
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('banner')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Image
                </Button>
                {formData.banner && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {formData.banner.name}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contract">Event Contract</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload a contract file (PDF/DOC)
                </p>
                <Input
                  id="contract"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, 'contract')}
                  className="hidden"
                />
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('contract')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
                {formData.contract && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {formData.contract.name}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Actions */}
        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            Create Event
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/events')}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;