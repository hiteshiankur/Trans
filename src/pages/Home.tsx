import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  UserCheck, 
  CalendarClock, 
  Search, 
  MapPin, 
  Clock,
  Plus,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data
const mockEvents = [
  {
    id: '1',
    title: 'Team Building Workshop',
    date: '2024-08-10',
    time: '09:00 AM',
    description: 'A fun team building workshop to enhance collaboration',
    location: 'Conference Room A, New York Office',
    status: 'upcoming',
    isEligible: true,
    hasJoined: false
  },
  {
    id: '2',
    title: 'Quarterly Review Meeting',
    date: '2024-08-08',
    time: '02:00 PM',
    description: 'Quarterly performance review and planning session',
    location: 'Main Auditorium, New York Office',
    status: 'ongoing',
    isEligible: true,
    hasJoined: true
  },
  {
    id: '3',
    title: 'Product Launch Event',
    date: '2024-08-15',
    time: '10:00 AM',
    description: 'Exciting product launch presentation for all stakeholders',
    location: 'Grand Ballroom, Marriott Hotel',
    status: 'upcoming',
    isEligible: false,
    hasJoined: false
  }
];

const Home = () => {
  const { user, hasRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const isAdmin = hasRole('admin');

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'upcoming-ongoing' && ['upcoming', 'ongoing'].includes(event.status)) ||
      (selectedCategory === 'other' && !['upcoming', 'ongoing'].includes(event.status));
    
    return matchesSearch && matchesCategory;
  });

  if (isAdmin) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}</p>
          </div>
          <Link to="/events/create">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Event
            </Button>
          </Link>
        </div>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">
                +12 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-success">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">
                +7 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-warning">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">189</div>
              <p className="text-xs text-muted-foreground">
                76% attendance rate
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary-light">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ongoing Events</CardTitle>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                2 ending today
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>
              Overview of recently created and ongoing events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.date} at {event.time}</p>
                  </div>
                  <Badge variant={event.status === 'ongoing' ? 'default' : 'secondary'}>
                    {event.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Employee View
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Events</h1>
        <p className="text-muted-foreground">Discover and join upcoming events</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={selectedCategory === 'upcoming-ongoing' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('upcoming-ongoing')}
            size="sm"
          >
            Upcoming & Ongoing
          </Button>
          <Button
            variant={selectedCategory === 'other' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('other')}
            size="sm"
          >
            Other Events
          </Button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-custom-md transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {event.description}
                  </CardDescription>
                </div>
                <Badge 
                  variant={event.status === 'ongoing' ? 'default' : event.status === 'upcoming' ? 'secondary' : 'outline'}
                >
                  {event.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{event.date} at {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                {event.hasJoined ? (
                  <Badge variant="default" className="w-full justify-center py-2">
                    Joined
                  </Badge>
                ) : event.isEligible && ['upcoming', 'ongoing'].includes(event.status) ? (
                  <Link to={`/events/${event.id}`}>
                    <Button className="w-full">
                      Ask to Join
                    </Button>
                  </Link>
                ) : !event.isEligible ? (
                  <Button variant="outline" disabled className="w-full">
                    Not Eligible
                  </Button>
                ) : (
                  <Link to={`/events/${event.id}`}>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
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
            {searchTerm ? 'Try adjusting your search criteria.' : 'Check back later for new events.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;