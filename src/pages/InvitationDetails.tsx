import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  FileText,
  ArrowLeft,
  Check,
  X,
  Loader2,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { invitationsApi } from '@/lib/api';

// Types for invitation data
type InvitationData = {
  id: number;
  employeeId: string;
  userId: string;
  eventId: number;
  contractPdf: string;
  individualcontractpdf: string | null;
  fileName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  event: {
    id: number;
    eventName: string;
    contractPdf: string;
    eventBanner: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    latitude: number;
    longitude: number;
    invitees: string[];
    hrs: string[];
    userId: string;
  };
};

interface InvitationDetailsProps {
  onStatusUpdate?: (invitationId: number, status: string) => void;
}

const InvitationDetails: React.FC<InvitationDetailsProps> = ({ onStatusUpdate }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchInvitationDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        // For now, we'll fetch all invitations and find the specific one
        // In a real app, you'd have a specific API endpoint for single invitation
        const response = await invitationsApi.getAllMyInvitations();
        const foundInvitation = response.allMyInvitations.find(
          inv => inv.id === parseInt(id)
        );
        
        if (foundInvitation) {
          setInvitation(foundInvitation);
        } else {
          setError('Invitation not found');
        }
      } catch (error) {
        console.error('Error fetching invitation details:', error);
        setError('Failed to load invitation details');
        toast({
          title: "Error",
          description: "Failed to load invitation details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInvitationDetails();
  }, [id, toast]);

  const handleResponse = async (response: 'accepted' | 'rejected') => {
    if (!invitation) return;
    
    try {
      setActionLoading(true);
      
      // Call the API to accept/reject the invitation
      await invitationsApi.acceptOrRejectInvitation(
        invitation.id, 
        response === 'accepted'
      );
      
      // Update the local state
      const newStatus = response === 'accepted' ? 'Accepted' : 'Rejected';
      setInvitation(prev => prev ? {
        ...prev,
        status: newStatus,
        updatedAt: new Date().toISOString()
      } : null);
      
      // Notify parent component of the status update if it's provided
      // This is useful if the details page is opened from a list view
      if (onStatusUpdate) {
        onStatusUpdate(invitation.id, newStatus);
      }
      
      toast({
        title: response === 'accepted' ? "Invitation Accepted" : "Invitation Rejected",
        description: `You have ${response} the invitation to "${invitation.event.eventName}".`,
      });
    } catch (error) {
      console.error('Error responding to invitation:', error);
      toast({
        title: "Error",
        description: "Failed to respond to invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'default';
      case 'rejected':
      case 'declined':
        return 'destructive';
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const handleDownloadContract = () => {
    if (invitation?.contractPdf) {
      window.open(invitation.contractPdf, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading invitation details...</span>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/invitations')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Invitations
          </Button>
        </div>
        
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-foreground mb-2">
            {error || 'Invitation not found'}
          </h3>
          <p className="text-muted-foreground mb-4">
            The invitation you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Button onClick={() => navigate('/invitations')}>
            Back to Invitations
          </Button>
        </div>
      </div>
    );
  }

  const isPending = invitation.status.toLowerCase() === 'pending';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/invitations')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Invitations
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Invitation Details</h1>
            <p className="text-muted-foreground">View and manage your event invitation</p>
          </div>
        </div>
        
        <Badge variant={getStatusVariant(invitation.status)} className="text-sm">
          {invitation.status}
        </Badge>
      </div>

      {/* Event Banner */}
      {invitation.event.eventBanner && (
        <div className="w-full h-64 rounded-lg overflow-hidden">
          <img 
            src={invitation.event.eventBanner} 
            alt={invitation.event.eventName}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{invitation.event.eventName}</CardTitle>
              <CardDescription className="text-base">
                {invitation.event.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Start Date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(invitation.event.startDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">End Date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(invitation.event.endDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{invitation.event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Invitees</p>
                    <p className="text-sm text-muted-foreground">
                      {invitation.event.invitees.length} people invited
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contract Information */}
          {invitation.contractPdf && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Contract Document
                </CardTitle>
                <CardDescription>
                  Review the event contract and terms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{invitation.fileName}</p>
                      <p className="text-sm text-muted-foreground">PDF Document</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleDownloadContract}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invitation Status</CardTitle>
              <CardDescription>
                Current status of your invitation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Badge variant={getStatusVariant(invitation.status)} className="text-lg px-4 py-2">
                  {invitation.status}
                </Badge>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <span className="font-medium">Invited:</span>{' '}
                  {new Date(invitation.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Last Updated:</span>{' '}
                  {new Date(invitation.updatedAt).toLocaleDateString()}
                </p>
              </div>

              {/* Action Buttons */}
              {isPending && (
                <div className="space-y-2 pt-4 border-t">
                  <Button 
                    className="w-full gap-2"
                    onClick={() => handleResponse('accepted')}
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    Accept Invitation
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => handleResponse('rejected')}
                    disabled={actionLoading}
                  >
                    <X className="w-4 h-4" />
                    Reject Invitation
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvitationDetails;
