import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Clock,
  MapPin,
  Users,
  Download,
  Eye,
  Edit
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock events data
const mockEvents = [
  {
    id: '1',
    title: 'Team Building Workshop',
    description: 'A fun team building workshop to enhance collaboration',
    startDate: '2024-08-10',
    endDate: '2024-08-10',
    startTime: '09:00',
    endTime: '17:00',
    location: 'Conference Room A, New York Office',
    status: 'upcoming',
    totalInvitees: 25,
    acceptedInvitees: 18,
    attendees: 0,
    createdAt: '2024-07-25'
  },
  {
    id: '2',
    title: 'Quarterly Review Meeting',
    description: 'Quarterly performance review and planning session',
    startDate: '2024-08-08',
    endDate: '2024-08-08',
    startTime: '14:00',
    endTime: '16:00',
    location: 'Main Auditorium, New York Office',
    status: 'ongoing',
    totalInvitees: 50,
    acceptedInvitees: 42,
    attendees: 38,
    createdAt: '2024-07-20'
  },
  {
    id: '3',
    title: 'Product Launch Event',
    description: 'Exciting product launch presentation for all stakeholders',
    startDate: '2024-08-15',
    endDate: '2024-08-15',
    startTime: '10:00',
    endTime: '12:00',
    location: 'Grand Ballroom, Marriott Hotel',
    status: 'upcoming',
    totalInvitees: 100,
    acceptedInvitees: 85,
    attendees: 0,
    createdAt: '2024-07-30'
  },
  {
    id: '4',
    title: 'Training Session - React Best Practices',
    description: 'Technical training session for frontend developers',
    startDate: '2024-07-30',
    endDate: '2024-07-30',
    startTime: '09:00',
    endTime: '12:00',
    location: 'Training Room B, New York Office',
    status: 'completed',
    totalInvitees: 15,
    acceptedInvitees: 12,
    attendees: 11,
    createdAt: '2024-07-15'
  }
];

const Events = () => {
  const [events, setEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'text-green-600';
      case 'upcoming':
        return 'text-blue-600';
      case 'completed':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground">Manage and monitor all organization events</p>
        </div>
        
        <Link to="/events/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('all')}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={statusFilter === 'upcoming' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('upcoming')}
            size="sm"
          >
            Upcoming
          </Button>
          <Button
            variant={statusFilter === 'ongoing' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('ongoing')}
            size="sm"
          >
            Ongoing
          </Button>
          <Button
            variant={statusFilter === 'completed' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('completed')}
            size="sm"
          >
            Completed
          </Button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-custom-md transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {event.description}
                  </CardDescription>
                </div>
                <Badge variant={getStatusVariant(event.status)}>
                  {event.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Event Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {event.startDate === event.endDate 
                      ? event.startDate 
                      : `${event.startDate} - ${event.endDate}`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{event.startTime} - {event.endTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{event.totalInvitees}</div>
                  <div className="text-xs text-muted-foreground">Invited</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{event.acceptedInvitees}</div>
                  <div className="text-xs text-muted-foreground">Accepted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">{event.attendees}</div>
                  <div className="text-xs text-muted-foreground">Attended</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Link to={`/events/${event.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                </Link>
                <Link to={`/events/${event.id}/edit`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>
                {event.status === 'completed' && (
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Report
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No events found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Try adjusting your search criteria.' : 'Create your first event to get started.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Events;