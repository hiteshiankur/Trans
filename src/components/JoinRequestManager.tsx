import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Check, 
  X, 
  Clock, 
  User, 
  Mail,
  Calendar,
  UserCheck,
  UserX
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JoinRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userJobTitle?: string;
  requestedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
}

interface JoinRequestManagerProps {
  eventId: string;
  eventTitle: string;
  requests: JoinRequest[];
  onRequestUpdate?: (requests: JoinRequest[]) => void;
  className?: string;
}

const JoinRequestManager: React.FC<JoinRequestManagerProps> = ({
  eventId,
  eventTitle,
  requests,
  onRequestUpdate,
  className = ""
}) => {
  const { toast } = useToast();
  const [localRequests, setLocalRequests] = useState<JoinRequest[]>(requests);

  const handleRequestAction = (requestId: string, action: 'accept' | 'reject') => {
    const updatedRequests = localRequests.map(request => 
      request.id === requestId 
        ? { ...request, status: action === 'accept' ? 'accepted' as const : 'rejected' as const }
        : request
    );
    
    setLocalRequests(updatedRequests);
    onRequestUpdate?.(updatedRequests);

    const request = localRequests.find(r => r.id === requestId);
    if (request) {
      toast({
        title: `Request ${action === 'accept' ? 'Accepted' : 'Rejected'}`,
        description: `${request.userName}'s join request has been ${action === 'accept' ? 'accepted' : 'rejected'}.`,
      });
    }
  };

  const pendingRequests = localRequests.filter(r => r.status === 'pending');
  const processedRequests = localRequests.filter(r => r.status !== 'pending');

  const getStatusVariant = (status: JoinRequest['status']) => {
    switch (status) {
      case 'accepted':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: JoinRequest['status']) => {
    switch (status) {
      case 'accepted':
        return <UserCheck className="w-4 h-4" />;
      case 'rejected':
        return <UserX className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Join Requests</CardTitle>
        <CardDescription>
          Manage employee requests to join {eventTitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="w-4 h-4" />
              Pending ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="processed" className="gap-2">
              <Check className="w-4 h-4" />
              Processed ({processedRequests.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-4">
            {pendingRequests.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Pending Requests</h3>
                <p className="text-muted-foreground">
                  All join requests have been processed.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {request.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{request.userName}</h4>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            {request.userEmail}
                          </div>
                          {request.userJobTitle && (
                            <p className="text-xs text-muted-foreground">{request.userJobTitle}</p>
                          )}
                        </div>
                      </div>
                      <Badge variant="secondary" className="gap-1">
                        <Clock className="w-3 h-3" />
                        Pending
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      Requested {new Date(request.requestedAt).toLocaleString()}
                    </div>

                    {request.message && (
                      <div className="p-2 bg-muted rounded text-sm">
                        <strong>Message:</strong> {request.message}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 gap-2"
                        onClick={() => handleRequestAction(request.id, 'accept')}
                      >
                        <Check className="w-4 h-4" />
                        Accept
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 gap-2"
                        onClick={() => handleRequestAction(request.id, 'reject')}
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="processed" className="space-y-4">
            {processedRequests.length === 0 ? (
              <div className="text-center py-8">
                <UserCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Processed Requests</h3>
                <p className="text-muted-foreground">
                  Processed requests will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {processedRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {request.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-sm">{request.userName}</h4>
                          <p className="text-xs text-muted-foreground">{request.userEmail}</p>
                        </div>
                      </div>
                      <Badge variant={getStatusVariant(request.status)} className="gap-1">
                        {getStatusIcon(request.status)}
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default JoinRequestManager;