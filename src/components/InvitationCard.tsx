import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  MapPin,
  Check,
  X,
  Eye,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

interface InvitationCardProps {
  invitation: InvitationData;
  onAccept?: (invitationId: number) => void;
  onReject?: (invitationId: number) => void;
  onDismiss?: (invitationId: number) => void;
  onStatusUpdate?: (invitationId: number, newStatus: string) => void;
}

const InvitationCard: React.FC<InvitationCardProps> = ({
  invitation,
  onAccept,
  onReject,
  onDismiss,
  onStatusUpdate
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

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

  const handleViewDetails = () => {
    navigate(`/invitations/${invitation.id}`);
  };

  const handleAccept = async () => {
    try {
      setLoading(true);
      await invitationsApi.acceptOrRejectInvitation(invitation.id, true);
      
      // Update the status locally
      onStatusUpdate?.(invitation.id, 'Accepted');
      
      // Call the original onAccept if provided (for backward compatibility)
      onAccept?.(invitation.id);
      
      toast({
        title: "Invitation Accepted",
        description: `You have accepted the invitation to "${invitation.event.eventName}".`,
      });
    } catch (error) {
      console.error('Error accepting invitation:', error);
      toast({
        title: "Error",
        description: "Failed to accept invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);
      await invitationsApi.acceptOrRejectInvitation(invitation.id, false);
      
      // Update the status locally
      onStatusUpdate?.(invitation.id, 'Rejected');
      
      // Call the original onReject if provided (for backward compatibility)
      onReject?.(invitation.id);
      
      toast({
        title: "Invitation Rejected",
        description: `You have rejected the invitation to "${invitation.event.eventName}".`,
      });
    } catch (error) {
      console.error('Error rejecting invitation:', error);
      toast({
        title: "Error",
        description: "Failed to reject invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isPending = invitation.status.toLowerCase() === 'pending';

  return (
    <Card className="hover:shadow-custom-md transition-shadow duration-200 border-l-4 border-l-warning">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{invitation.event.eventName}</CardTitle>
            <CardDescription className="mt-2">
              {invitation.event.description}
            </CardDescription>
          </div>
          <Badge variant={getStatusVariant(invitation.status)}>
            {invitation.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(invitation.event.startDate).toLocaleDateString()} - {new Date(invitation.event.endDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{invitation.event.location}</span>
          </div>
        </div>
        
        <div className="flex gap-2 pt-4 border-t">
          {/* View Button - Always visible */}
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={handleViewDetails}
          >
            <Eye className="w-4 h-4" />
            View
          </Button>

          {/* Accept/Reject buttons - Only visible for pending invitations */}
          {isPending && (
            <>
              <Button 
                size="sm" 
                className="flex-1 gap-2"
                onClick={handleAccept}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                Accept
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 gap-2"
                onClick={handleReject}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <X className="w-4 h-4" />
                )}
                Reject
              </Button>
            </>
          )}

          {/* Dismiss button for non-pending invitations */}
          {!isPending && onDismiss && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2"
              onClick={() => onDismiss(invitation.id)}
            >
              Dismiss
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvitationCard;
