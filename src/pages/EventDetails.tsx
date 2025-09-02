import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { eventsApi } from '@/lib/api';
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
  Edit,
  Loader2,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PunchInButton from '@/components/PunchInButton';
import JoinRequestManager from '@/components/JoinRequestManager';
import ReportExporter from '@/components/ReportExporter';

// Event data interface based on API response
interface EventDetails {
  id: number;
  eventName: string;
  latitude: number;
  longitude: number;
  location: string;
  hrs: string[];
  invitees: string[];
  description: string;
  eventBanner: string;
  contractPdf: string;
  fileName: string;
  userId: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  puchType: string;
  requestCount: number;
  inviteesAndHrs: Array<{
    id: string;
    contractPdf: string;
    fileName: string;
  }>;
  message: string;
}

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, hasRole } = useAuth();
  const { toast } = useToast();
  const [isJoinLoading, setIsJoinLoading] = useState(false);
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = hasRole('admin');

  // Fetch event details on component mount
  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!id) {
        setError('No event ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await eventsApi.getById(id);
        setEvent(response);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError('Failed to fetch event details');
        toast({
          title: 'Error',
          description: 'Failed to fetch event details. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id, toast]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading event details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !event) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Event not found</h1>
        <p className="text-muted-foreground">{error || "The event you're looking for doesn't exist."}</p>
        <Button onClick={() => navigate('/events')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Event not found</h1>
        <p className="text-muted-foreground">The event you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/')} className="mt-4">
          Back to Home
        </Button>
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
    <div className="max-w-6xl mx-auto space-y-6">
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
            <h1 className="text-3xl font-bold text-foreground">{event.eventName}</h1>
            <Badge variant={getStatusVariant(event.status)}>
              {event.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">Created on {new Date(event.createdAt).toLocaleDateString()}</p>
        </div>

        {isAdmin && (
          <div className="flex gap-2">
            {/* Only show Edit button for upcoming events */}
            {event.status !== 'completed' && new Date(event.startDate) > new Date() && (
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => navigate(`/events/edit/${event.id}`)}
              >
                <Edit className="w-4 h-4" />
                Edit Event
              </Button>
            )}
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
          {/* Event Information */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{event.eventName}</CardTitle>
                  <CardDescription className="text-base">
                    {event.description}
                  </CardDescription>
                </div>
                <Badge variant={getStatusVariant(event.status)}>
                  {event.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Event Banner */}
              {event.eventBanner && (
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <img 
                    src={event.eventBanner} 
                    alt={event.eventName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>
                    {event.startDate === event.endDate 
                      ? new Date(event.startDate).toLocaleDateString()
                      : `${new Date(event.startDate).toLocaleDateString()} - ${new Date(event.endDate).toLocaleDateString()}`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{event.invitees.length} Invitees</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{event.hrs.length} HR Managers</span>
                </div>
              </div>

              {/* Coordinates */}
              {event.latitude && event.longitude && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Coordinates</p>
                  <p className="text-sm font-mono">
                    📍 {event.latitude}, {event.longitude}
                  </p>
                </div>
              )}

              {/* Contract PDF */}
              {event.contractPdf && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Contract Document</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.open(event.contractPdf, '_blank')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {event.fileName}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Invitees and HRs List */}
          <Card>
            <CardHeader>
              <CardTitle>Participants ({event.inviteesAndHrs.length})</CardTitle>
              <CardDescription>All event participants including invitees and HR managers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {event.inviteesAndHrs.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {participant.id.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">Participant {participant.id.substring(0, 8)}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.hrs.includes(participant.id) ? 'HR Manager' : 'Invitee'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {participant.contractPdf && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => window.open(participant.contractPdf, '_blank')}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {participant.fileName}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Event Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Event Type</span>
                <Badge variant="outline">{event.puchType}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={getStatusVariant(event.status)}>{event.status}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Join Requests</span>
                <span className="font-medium">{event.requestCount}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Created</span>
                <span className="text-sm">{new Date(event.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Updated</span>
                <span className="text-sm">{new Date(event.updatedAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Event Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Event Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Invitees</span>
                  <span className="font-medium">{event.invitees.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">HR Managers</span>
                  <span className="font-medium text-success">{event.hrs.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Participants</span>
                  <span className="font-medium text-warning">{event.inviteesAndHrs.length}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Join Requests</span>
                  <span className="font-medium">{event.requestCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          {user?.role === 'employee' && event.status === 'AskToJoin' && (
            <Card>
              <CardHeader>
                <CardTitle>Join Event</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={handleJoinRequest}
                  disabled={isJoinLoading}
                >
                  {isJoinLoading ? 'Sending Request...' : 'Request to Join'}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;