import React, { useState } from 'react';
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
  MapPin
} from 'lucide-react';

// Mock contracts data
const mockContracts = [
  {
    id: '1',
    eventId: '1',
    eventTitle: 'Team Building Workshop',
    eventDate: '2024-08-10',
    eventTime: '09:00 AM',
    eventLocation: 'Conference Room A, New York Office',
    fileName: 'team_building_contract.pdf',
    fileSize: '2.4 MB',
    uploadedAt: '2024-07-25',
    fileType: 'PDF'
  },
  {
    id: '2',
    eventId: '2',
    eventTitle: 'Quarterly Review Meeting',
    eventDate: '2024-08-08',
    eventTime: '02:00 PM',
    eventLocation: 'Main Auditorium, New York Office',
    fileName: 'q3_review_agreement.doc',
    fileSize: '1.8 MB',
    uploadedAt: '2024-07-20',
    fileType: 'DOC'
  },
  {
    id: '3',
    eventId: '3',
    eventTitle: 'Product Launch Event',
    eventDate: '2024-08-15',
    eventTime: '10:00 AM',
    eventLocation: 'Grand Ballroom, Marriott Hotel',
    fileName: 'product_launch_nda.pdf',
    fileSize: '3.1 MB',
    uploadedAt: '2024-07-30',
    fileType: 'PDF'
  },
  {
    id: '4',
    eventId: '4',
    eventTitle: 'Annual Conference 2024',
    eventDate: '2024-09-15',
    eventTime: '09:00 AM',
    eventLocation: 'Convention Center, Las Vegas',
    fileName: 'conference_participation_agreement.pdf',
    fileSize: '4.2 MB',
    uploadedAt: '2024-08-01',
    fileType: 'PDF'
  }
];

const Contracts = () => {
  const [contracts, setContracts] = useState(mockContracts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContracts = contracts.filter(contract =>
    contract.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (contract: typeof mockContracts[0]) => {
    // In a real app, this would trigger file download
    console.log(`Downloading ${contract.fileName}`);
    
    // Create a dummy download for demo purposes
    const link = document.createElement('a');
    link.href = '#';
    link.download = contract.fileName;
    link.click();
  };

  const handleView = (contract: typeof mockContracts[0]) => {
    // In a real app, this would open the file in a modal or new tab
    console.log(`Viewing ${contract.fileName}`);
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
          const eventStatus = getEventStatus(contract.eventDate);
          
          return (
            <Card key={contract.id} className="hover:shadow-custom-md transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{contract.eventTitle}</CardTitle>
                    <CardDescription className="mt-1">
                      Contract for event participation
                    </CardDescription>
                  </div>
                  <Badge variant={eventStatus.variant}>
                    {eventStatus.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Event Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{contract.eventDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{contract.eventTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{contract.eventLocation}</span>
                  </div>
                </div>

                {/* File Information */}
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{contract.fileName}</div>
                      <div className="text-xs text-muted-foreground">
                        {contract.fileSize} • Uploaded {new Date(contract.uploadedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getFileTypeColor(contract.fileType)}`}>
                      {contract.fileType}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2"
                    onClick={() => handleView(contract)}
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 gap-2"
                    onClick={() => handleDownload(contract)}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
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