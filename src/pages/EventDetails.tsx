import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  CheckCircle,
  XCircle,
  UserCheck,
  Download,
  Edit
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock event data
const mockEventDetails = {
  '1': {
    id: '1',
    title: 'Team Building Workshop',
    description: 'A comprehensive team building workshop designed to enhance collaboration, communication, and trust among team members. This interactive session will include various activities and exercises to strengthen team bonds.',
    startDate: '2024-08-10',
    endDate: '2024-08-10',
    startTime: '09:00',
    endTime: '17:00',
    location: 'Conference Room A, New York Office',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    status: 'upcoming',
    bannerUrl: '/api/placeholder/600/300',
    totalInvitees: 25,
    acceptedInvitees: 18,
    attendees: 0,
    createdAt: '2024-07-25',
    createdBy: 'Admin User',
    hrs: [
      { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@company.com' },
      { id: '2', name: 'Mike Wilson', email: 'mike.wilson@company.com' }
    ],
    invitees: [
      { id: '3', name: 'John Smith', email: 'john.smith@company.com', status: 'accepted', punchIn: null },
      { id: '4', name: 'Emily Davis', email: 'emily.davis@company.com', status: 'pending', punchIn: null },
      { id: '5', name: 'David Brown', email: 'david.brown@company.com', status: 'accepted', punchIn: '09:15' }
    ],
    hasUserJoined: false,
    isUserEligible: true
  }
};

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, hasRole } = useAuth();
  const { toast } = useToast();
  const [isJoinLoading, setIsJoinLoading] = useState(false);

  const event = id ? mockEventDetails[id as keyof typeof mockEventDetails] : null;
  const isAdmin = hasRole('admin');

  if (!event) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Event not found</h1>
          <p className="text-muted-foreground">The event you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleJoinRequest = async () => {
    setIsJoinLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Join Request Sent",
        description: "Your request to join this event has been sent to the administrators.",
      });
      setIsJoinLoading(false);
    }, 1500);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'default';
      case 'upcoming':
        return 'secondary';
      case 'completed':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getInviteeStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'text-green-600';
      case 'declined':
        return 'text-red-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-foreground">{event.title}</h1>
            <Badge variant={getStatusVariant(event.status)}>
              {event.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">Created by {event.createdBy}</p>
        </div>

        {isAdmin && (
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Event
            </Button>
            {event.status === 'completed' && (
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Banner */}
          <Card>
            <CardContent className="p-0">
              <div className="w-full h-64 bg-gradient-hero rounded-t-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Calendar className="w-12 h-12 mx-auto mb-2 opacity-80" />
                  <p className="text-sm opacity-80">Event Banner</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Information */}
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Complete information about this event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-sm text-muted-foreground">
                        {event.startDate === event.endDate 
                          ? event.startDate 
                          : `${event.startDate} - ${event.endDate}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-sm text-muted-foreground">
                        {event.startTime} - {event.endTime}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Participants</p>
                      <p className="text-sm text-muted-foreground">
                        {event.acceptedInvitees} of {event.totalInvitees} confirmed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{event.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Management (Admin Only) */}
          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>Attendance Management</CardTitle>
                <CardDescription>Monitor and manage event attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{event.totalInvitees}</div>
                      <div className="text-xs text-muted-foreground">Total Invited</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">{event.acceptedInvitees}</div>
                      <div className="text-xs text-muted-foreground">Accepted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-warning">{event.attendees}</div>
                      <div className="text-xs text-muted-foreground">Checked In</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Invitee Status</h4>
                    {event.invitees.map((invitee) => (
                      <div key={invitee.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {invitee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{invitee.name}</p>
                            <p className="text-xs text-muted-foreground">{invitee.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {invitee.punchIn && (
                            <span className="text-xs text-success">
                              Checked in at {invitee.punchIn}
                            </span>
                          )}
                          <Badge 
                            variant={invitee.status === 'accepted' ? 'default' : invitee.status === 'declined' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {invitee.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Card */}
          {!isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>Join Event</CardTitle>
                <CardDescription>
                  Request to participate in this event
                </CardDescription>
              </CardHeader>
              <CardContent>
                {event.hasUserJoined ? (
                  <div className="text-center space-y-3">
                    <CheckCircle className="w-12 h-12 text-success mx-auto" />
                    <div>
                      <p className="font-medium text-success">Already Joined</p>
                      <p className="text-sm text-muted-foreground">
                        You're registered for this event
                      </p>
                    </div>
                    {event.status === 'ongoing' && (
                      <Button className="w-full">
                        <UserCheck className="w-4 h-4 mr-2" />
                        Punch In
                      </Button>
                    )}
                  </div>
                ) : event.isUserEligible && ['upcoming', 'ongoing'].includes(event.status) ? (
                  <Button 
                    className="w-full" 
                    onClick={handleJoinRequest}
                    disabled={isJoinLoading}
                  >
                    {isJoinLoading ? 'Sending Request...' : 'Ask to Join'}
                  </Button>
                ) : (
                  <div className="text-center space-y-3">
                    <XCircle className="w-12 h-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="font-medium text-muted-foreground">Not Eligible</p>
                      <p className="text-sm text-muted-foreground">
                        You cannot join this event
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Event HRs */}
          <Card>
            <CardHeader>
              <CardTitle>Event Managers</CardTitle>
              <CardDescription>HR personnel managing this event</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {event.hrs.map((hr) => (
                  <div key={hr.id} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {hr.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{hr.name}</p>
                      <p className="text-xs text-muted-foreground">{hr.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Event Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Event Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Invitees</span>
                  <span className="font-medium">{event.totalInvitees}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Accepted</span>
                  <span className="font-medium text-success">{event.acceptedInvitees}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Attended</span>
                  <span className="font-medium text-warning">{event.attendees}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Attendance Rate</span>
                  <span className="font-medium">
                    {event.acceptedInvitees > 0 
                      ? Math.round((event.attendees / event.acceptedInvitees) * 100)
                      : 0}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;