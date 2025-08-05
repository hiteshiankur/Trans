import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Calendar,
  Clock,
  MapPin,
  Check,
  X,
  Mail
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock invitations data
const mockInvitations = [
  {
    id: '1',
    eventId: '1',
    title: 'Team Building Workshop',
    date: '2024-08-10',
    time: '09:00 AM',
    location: 'Conference Room A, New York Office',
    description: 'A fun team building workshop to enhance collaboration',
    status: 'pending',
    invitedAt: '2024-07-25',
    respondedAt: null
  },
  {
    id: '2',
    eventId: '2',
    title: 'Quarterly Review Meeting',
    date: '2024-08-08',
    time: '02:00 PM',
    location: 'Main Auditorium, New York Office',
    description: 'Quarterly performance review and planning session',
    status: 'accepted',
    invitedAt: '2024-07-20',
    respondedAt: '2024-07-22'
  },
  {
    id: '3',
    eventId: '3',
    title: 'Product Launch Event',
    date: '2024-08-15',
    time: '10:00 AM',
    location: 'Grand Ballroom, Marriott Hotel',
    description: 'Exciting product launch presentation for all stakeholders',
    status: 'pending',
    invitedAt: '2024-07-30',
    respondedAt: null
  },
  {
    id: '4',
    eventId: '4',
    title: 'Holiday Party 2024',
    date: '2024-12-20',
    time: '06:00 PM',
    location: 'Company Headquarters, Main Hall',
    description: 'Annual company holiday celebration with dinner and entertainment',
    status: 'declined',
    invitedAt: '2024-07-15',
    respondedAt: '2024-07-16'
  }
];

const Invitations = () => {
  const [invitations, setInvitations] = useState(mockInvitations);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredInvitations = invitations.filter(invitation =>
    invitation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invitation.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResponse = (invitationId: string, response: 'accepted' | 'declined') => {
    setInvitations(prev =>
      prev.map(inv =>
        inv.id === invitationId
          ? { ...inv, status: response, respondedAt: new Date().toISOString().split('T')[0] }
          : inv
      )
    );

    const invitation = invitations.find(inv => inv.id === invitationId);
    if (invitation) {
      toast({
        title: response === 'accepted' ? "Invitation Accepted" : "Invitation Declined",
        description: `You have ${response} the invitation to "${invitation.title}".`,
      });
    }
  };

  const handleDismiss = (invitationId: string) => {
    setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
    toast({
      title: "Invitation Dismissed",
      description: "The invitation has been removed from your list.",
    });
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'default';
      case 'declined':
        return 'destructive';
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
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

      {/* Pending Invitations */}
      {pendingInvitations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Pending Invitations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pendingInvitations.map((invitation) => (
              <Card key={invitation.id} className="hover:shadow-custom-md transition-shadow duration-200 border-l-4 border-l-warning">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{invitation.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {invitation.description}
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
                      <span>{invitation.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{invitation.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{invitation.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4 border-t">
                    <Button 
                      size="sm" 
                      className="flex-1 gap-2"
                      onClick={() => handleResponse(invitation.id, 'accepted')}
                    >
                      <Check className="w-4 h-4" />
                      Accept
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 gap-2"
                      onClick={() => handleResponse(invitation.id, 'declined')}
                    >
                      <X className="w-4 h-4" />
                      Decline
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => handleDismiss(invitation.id)}
                    >
                      Dismiss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Responded Invitations */}
      {respondedInvitations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Previous Responses</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {respondedInvitations.map((invitation) => (
              <Card key={invitation.id} className="hover:shadow-custom-md transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{invitation.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {invitation.description}
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
                      <span>{invitation.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{invitation.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{invitation.location}</span>
                    </div>
                  </div>
                  
                  {invitation.respondedAt && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        Responded on {new Date(invitation.respondedAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {filteredInvitations.length === 0 && (
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