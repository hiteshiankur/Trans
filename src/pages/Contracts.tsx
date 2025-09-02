import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  FileText,
  Download,
  Eye,
  Calendar,
  Clock,
  MapPin,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { invitationsApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

// Type for contract data from API
interface Contract {
  id: number;
  eventId: number;
  employeeId: string;
  status: string;
  contractPdf: string;
  event: {
    id: number;
    eventName: string;
    startDate: string;
    endDate: string;
    location: string;
  };
}

const Contracts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch contracts on component mount
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        setLoading(true);
        const response = await invitationsApi.getAllMyInvitationAcceptedContracts();
        setContracts(response.allMyContracts);
      } catch (error) {
        console.error('Error fetching contracts:', error);
        setError('Failed to load contracts. Please try again.');
        toast({
          title: 'Error',
          description: 'Failed to load contracts. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [toast]);

  const filteredContracts = contracts.filter(contract =>
    contract.event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.contractPdf.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (contract: Contract) => {
    try {
      const link = document.createElement('a');
      link.href = contract.contractPdf;
      // Extract filename from URL or use a default name
      const fileName = contract.contractPdf.split('/').pop() || `contract-${contract.id}.pdf`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading contract:', error);
      toast({
        title: 'Error',
        description: 'Failed to download contract. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleView = (contract: Contract) => {
    window.open(contract.contractPdf, '_blank', 'noopener,noreferrer');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getFileTypeColor = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return 'bg-red-100 text-red-800';
      case 'doc':
      case 'docx':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventStatus = (eventDate: string) => {
    const today = new Date();
    const event = new Date(eventDate);
    
    if (event < today) {
      return { label: 'Completed', variant: 'outline' as const };
    } else if (event.toDateString() === today.toDateString()) {
      return { label: 'Today', variant: 'default' as const };
    } else {
      return { label: 'Upcoming', variant: 'secondary' as const };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading contracts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-600">
        <AlertCircle className="h-10 w-10 mb-2" />
        <p className="text-lg font-medium">Failed to load contracts</p>
        <p className="text-sm text-muted-foreground mt-1">{error}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Contracts</h1>
        <p className="text-muted-foreground">Access event contracts and agreements</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search contracts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Contracts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredContracts.map((contract) => {
          const fileName = contract.contractPdf.split('/').pop() || `contract-${contract.id}.pdf`;
          const fileType = fileName.split('.').pop()?.toUpperCase() || 'PDF';
          const eventDate = formatDate(contract.event.startDate);
          
          return (
            <Card key={contract.id} className="hover:shadow-md transition-shadow">
              <div className="md:flex">
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{contract.event.eventName}</CardTitle>
                      <CardDescription className="mt-1">
                        Contract ID: {contract.id}
                      </CardDescription>
                    </div>
                    <Badge 
                      className="ml-2" 
                      variant={contract.status === 'Accepted' ? 'default' : 'outline'}
                    >
                      {contract.status}
                    </Badge>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{eventDate}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="truncate">{contract.event.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 mr-2" />
                    <span className="truncate">{fileName}</span>
                    <span className="mx-2">•</span>
                    <span>{fileType}</span>
                  </div>
                </div>
                
                <div className="border-t md:border-t-0 md:border-l p-4 flex flex-col justify-center space-y-2 bg-muted/30">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleView(contract)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleDownload(contract)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredContracts.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No contracts found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Try adjusting your search criteria.' : 'You have no event contracts at the moment.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Contracts;