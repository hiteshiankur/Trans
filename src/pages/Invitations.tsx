import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Mail,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { invitationsApi } from '@/lib/api';
import InvitationCard from '@/components/InvitationCard';

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

const Invitations = () => {
  const [invitations, setInvitations] = useState<InvitationData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        setLoading(true);
        const response = await invitationsApi.getAllMyInvitations();
        setInvitations(response.allMyInvitations);
        setError(null);
      } catch (error) {
        console.error('Error fetching invitations:', error);
        setError('Failed to load invitations');
        toast({
          title: "Error",
          description: "Failed to load invitations. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchInvitations();
  }, [toast]);

  const filteredInvitations = invitations.filter(invitation =>
    invitation.event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invitation.event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResponse = (invitationId: number, response: 'accepted' | 'declined') => {
    setInvitations(prev =>
      prev.map(inv =>
        inv.id === invitationId
          ? { ...inv, status: response, updatedAt: new Date().toISOString() }
          : inv
      )
    );

    const invitation = invitations.find(inv => inv.id === invitationId);
    if (invitation) {
      toast({
        title: response === 'accepted' ? "Invitation Accepted" : "Invitation Declined",
        description: `You have ${response} the invitation to "${invitation.event.eventName}".`,
      });
    }
  };

  const handleDismiss = (invitationId: number) => {
    setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
    toast({
      title: "Invitation Dismissed",
      description: "The invitation has been removed from your list.",
    });
  };

  const handleStatusUpdate = (invitationId: number, newStatus: string) => {
    setInvitations(prev =>
      prev.map(inv =>
        inv.id === invitationId
          ? { ...inv, status: newStatus, updatedAt: new Date().toISOString() }
          : inv
      )
    );
  };

  const pendingInvitations = filteredInvitations.filter(inv => inv.status === 'pending');
  const respondedInvitations = filteredInvitations.filter(inv => inv.status !== 'pending');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Invitations</h1>
        <p className="text-muted-foreground">Manage your event invitations</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search invitations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading invitations...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Error Loading Invitations</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      )}

      {/* Pending Invitations */}
      {!loading && !error && pendingInvitations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Pending Invitations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pendingInvitations.map((invitation) => (
              <InvitationCard
                key={invitation.id}
                invitation={invitation}
                onAccept={(id) => handleResponse(id, 'accepted')}
                onReject={(id) => handleResponse(id, 'declined')}
                onDismiss={handleDismiss}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        </div>
      )}

      {/* Responded Invitations */}
      {!loading && !error && respondedInvitations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Previous Responses</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {respondedInvitations.map((invitation) => (
              <InvitationCard
                key={invitation.id}
                invitation={invitation}
                onDismiss={handleDismiss}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        </div>
      )}

      {!loading && !error && filteredInvitations.length === 0 && (
        <div className="text-center py-12">
          <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No invitations found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Try adjusting your search criteria.' : 'You have no event invitations at the moment.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Invitations;