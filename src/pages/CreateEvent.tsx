import React, { useState, useEffect, useRef } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { employeesApi, eventsApi } from '@/lib/api';
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

interface Employee {
  _id: string;
  name: string;
  email: string;
  jobTitle?: string;
  role: string;
}

const CreateEvent = () => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [eventLoading, setEventLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(!!id);
  
  const [formData, setFormData] = useState({
    eventName: '',
    startDate: '',
    endDate: '',
    location: '',
    latitude: '',
    longitude: '',
    description: '',
    eventBannerImage: null as File | null,
    contractPdf: null as File | null,
    individualContracts: [] as File[]
  });

  const [selectedHRs, setSelectedHRs] = useState<string[]>([]);
  const [selectedInvitees, setSelectedInvitees] = useState<string[]>([]);
  const [hrSearch, setHrSearch] = useState('');
  
  // Load existing event data when in edit mode
  useEffect(() => {
    const loadEventData = async () => {
      if (!isEditMode || !id) return;
      
      try {
        setEventLoading(true);
        const eventData = await eventsApi.getById(id);
        
        // Populate form with existing event data
        setFormData({
          eventName: eventData.eventName || '',
          startDate: eventData.startDate ? new Date(eventData.startDate).toISOString().slice(0, 16) : '',
          endDate: eventData.endDate ? new Date(eventData.endDate).toISOString().slice(0, 16) : '',
          location: eventData.location || '',
          latitude: eventData.latitude?.toString() || '',
          longitude: eventData.longitude?.toString() || '',
          description: eventData.description || '',
          eventBannerImage: null, // Files can't be pre-populated
          contractPdf: null,
          individualContracts: []
        });
        
        // Set selected HRs and invitees
        setSelectedHRs(eventData.hrs || []);
        setSelectedInvitees(eventData.invitees || []);
        
      } catch (error) {
        console.error('Error loading event data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load event data',
          variant: 'destructive',
        });
      } finally {
        setEventLoading(false);
      }
    };
    
    loadEventData();
  }, [isEditMode, id, toast]);

  // Fetch employees on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await employeesApi.getAllEmployees('employee');
        // Filter out current logged-in user and map to expected format
        const filteredEmployees = response.allEmployeeList
          .filter((emp: any) => emp.id !== user?.id)
          .map((emp: any) => ({
            _id: emp.id,
            name: emp.fullName,
            email: emp.email,
            jobTitle: emp.jobTitle,
            role: emp.role
          }));
        setEmployees(filteredEmployees);
      } catch (error) {
        console.error('Error fetching employees:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch employees list',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchEmployees();
  }, []);
  const [inviteeSearch, setInviteeSearch] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'eventBannerImage' | 'contractPdf') => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleIndividualContractChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      individualContracts: [...prev.individualContracts, ...files]
    }));
  };

  const removeIndividualContract = (index: number) => {
    setFormData(prev => ({
      ...prev,
      individualContracts: prev.individualContracts.filter((_, i) => i !== index)
    }));
  };

  const handleHRSelection = (employeeId: string) => {
    // Don't allow selecting invitees as HRs
    if (selectedInvitees.includes(employeeId)) return;
    
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

  const getAvailableInvitees = () => {
    return employees.filter(emp => !selectedHRs.includes(emp._id));
  };

  const getAvailableHRs = () => {
    return employees.filter(emp => !selectedInvitees.includes(emp._id));
  };

  const filteredHRs = getAvailableHRs().filter(emp => 
    (emp.name?.toLowerCase() || '').includes(hrSearch.toLowerCase()) ||
    (emp.email?.toLowerCase() || '').includes(hrSearch.toLowerCase())
  );

  const filteredInvitees = getAvailableInvitees().filter(emp => 
    (emp.name?.toLowerCase() || '').includes(inviteeSearch.toLowerCase()) ||
    (emp.email?.toLowerCase() || '').includes(inviteeSearch.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.eventName || !formData.startDate || !formData.endDate || !formData.location) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Event Name, Start Date, End Date, Location)",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      
      if (isEditMode && id) {
        // Update existing event
        const updateData = {
          eventName: formData.eventName,
          description: formData.description,
          startDate: formData.startDate,
          endDate: formData.endDate,
          location: formData.location,
          latitude: parseFloat(formData.latitude) || 0,
          longitude: parseFloat(formData.longitude) || 0,
          invitees: selectedInvitees,
          hrs: selectedHRs
        };
        
        await eventsApi.update(id, updateData);
        
        toast({
          title: "Success",
          description: "Event updated successfully!",
        });
      } else {
        // Create new event
        const inviteesAndHrsPdf = selectedInvitees.map((inviteeId, index) => ({
          id: inviteeId,
          pdf: formData.individualContracts[index]?.name || `contract_${index + 1}.pdf`
        }));
        
        const eventData = {
          eventName: formData.eventName,
          description: formData.description,
          startDate: formData.startDate,
          endDate: formData.endDate,
          location: formData.location,
          latitude: formData.latitude,
          longitude: formData.longitude,
          invitees: selectedInvitees,
          hrs: selectedHRs,
          inviteesAndHrsPdf: inviteesAndHrsPdf.length > 0 ? inviteesAndHrsPdf : undefined,
          eventBannerImage: formData.eventBannerImage || undefined,
          contractPdf: formData.contractPdf || undefined,
          individualContracts: formData.individualContracts.length > 0 ? formData.individualContracts : undefined
        };
        
        await eventsApi.addNewEvent(eventData);
        
        toast({
          title: "Success",
          description: "Event created successfully!",
        });
      }
      
      navigate('/events');
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} event:`, error);
      toast({
        title: "Error",
        description: `Failed to ${isEditMode ? 'update' : 'create'} event. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{isEditMode ? 'Edit Event' : 'Create Event'}</h1>
        <p className="text-muted-foreground">{isEditMode ? 'Update event details for your organization' : 'Set up a new event for your organization'}</p>
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

            {/* Location Manual Entry */}
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

            {/* Latitude & Longitude (auto-filled) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="any"
                  placeholder="e.g., 22.685788"
                  value={formData.latitude}
                  onChange={handleInputChange}

                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="any"
                  placeholder="e.g., 75.872210"
                  value={formData.longitude}
                  onChange={handleInputChange}

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
                    const hr = employees.find(emp => emp._id === hrId);
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
      key={employee._id} 
      className="flex items-center space-x-2 p-2 hover:bg-muted rounded-lg"
    >
      <Checkbox 
        checked={selectedHRs.includes(employee._id)}
        onCheckedChange={() => handleHRSelection(employee._id)}
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
                    const invitee = employees.find(emp => emp._id === inviteeId);
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
      key={employee._id} 
      className="flex items-center space-x-2 p-2 hover:bg-muted rounded-lg"
    >
      <Checkbox 
        checked={selectedInvitees.includes(employee._id)}
        onCheckedChange={() => handleInviteeSelection(employee._id)}
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
            <CardDescription>Upload event banner, contract, and individual contract files</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventBannerImage">Event Banner Image</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Image className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload an image for your event banner
                </p>
                <Input
                  id="eventBannerImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'eventBannerImage')}
                  className="hidden"
                />
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('eventBannerImage')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Image
                </Button>
                {formData.eventBannerImage && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {formData.eventBannerImage.name}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractPdf">Main Contract PDF</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload the main contract file (PDF)
                </p>
                <Input
                  id="contractPdf"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, 'contractPdf')}
                  className="hidden"
                />
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('contractPdf')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose PDF
                </Button>
                {formData.contractPdf && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {formData.contractPdf.name}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="individualContracts">Individual Contracts (Optional)</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload individual contract files for specific invitees (PDF)
                </p>
                <Input
                  id="individualContracts"
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleIndividualContractChange}
                  className="hidden"
                />
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('individualContracts')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
                {formData.individualContracts.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {formData.individualContracts.map((file, index) => (
                      <div key={index} className="flex items-center justify-between text-sm text-green-600">
                        <span>{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeIndividualContract(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Actions */}
        <div className="flex gap-4">
          <Button type="submit" className="flex-1" disabled={loading || eventLoading}>
            {loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Event' : 'Create Event')}
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