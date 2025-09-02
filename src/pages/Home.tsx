import React, { useState, useEffect } from 'react';
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
  Filter,
  Loader2,
  AlertCircle,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminApi, eventsApi } from '@/lib/api';

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

// Base event interface
interface BaseEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  location: string;
  status: string;
  isEligible: boolean;
  hasJoined: boolean;
  eventData?: TrendingEvent | typeof mockEvents[0];
}

// Type for trending events from API
interface TrendingEvent {
  id: number;
  location: string;
  eventBanner: string;
  userId: string;
  startDate: string;
  endDate: string;
  eventName: string;
  hrs: string[];
  eventStatus: string;
}

const Home = () => {
  const { user, hasRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [trendingData, setTrendingData] = useState<{
    userEvents: TrendingEvent[];
    events: TrendingEvent[];
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = hasRole('admin') || hasRole('superAdmin');
  const isEmployee = hasRole('employee');

  // Fetch dashboard data for admin or trending events for employees
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (isAdmin) {
          const response = await adminApi.getDashboardData();
          setDashboardData(response.dashBoardData);
        } else if (isEmployee) {
          const response = await eventsApi.getAllTrendingEvents();
          setTrendingData(response);
        }
        
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch data:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAdmin, isEmployee]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // For admin, use mock events; for employees, use trending events
  const eventsToDisplay: BaseEvent[] = isAdmin 
    ? mockEvents 
    : [
        ...(trendingData?.userEvents || []).map((event: TrendingEvent): BaseEvent => ({
          id: event.id.toString(),
          title: event.eventName,
          date: formatDate(event.startDate),
          time: '12:00 PM',
          description: 'Event details not available',
          location: event.location,
          status: event.eventStatus.toLowerCase(),
          isEligible: true,
          hasJoined: false,
          eventData: event
        })),
        ...(trendingData?.events || []).map((event: TrendingEvent): BaseEvent => ({
          id: event.id.toString(),
          title: event.eventName,
          date: formatDate(event.startDate),
          time: '12:00 PM',
          description: 'Event details not available',
          location: event.location,
          status: event.eventStatus.toLowerCase(),
          isEligible: true,
          hasJoined: false,
          eventData: event
        }))
      ];

  // Filter events based on search term and selected category
  const filteredEvents = eventsToDisplay.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const now = new Date();
    const eventDate = new Date(event.date);
    
    switch (selectedCategory) {
      case 'upcoming-ongoing':
        return matchesSearch && (event.status === 'upcoming' || event.status === 'ongoing');
      case 'other':
        return matchesSearch && !['upcoming', 'ongoing'].includes(event.status);
      default:
        return matchesSearch;
    }
  });

  if (isAdmin) {
    // Loading state
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading dashboard data...</span>
          </div>
        </div>
      );
    }

    // Error state
    if (error) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-500 mb-2">Failed to load dashboard data</div>
            <div className="text-sm text-muted-foreground">{error}</div>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
              variant="outline"
            >
              Retry
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.fullName || user?.email || 'Admin'}</p>
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
              <div className="text-2xl font-bold">{dashboardData?.totalEmployees || 0}</div>
              <p className="text-xs text-muted-foreground">
                Active: {dashboardData?.activeEmployees || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-success">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.completedEvents || 0}</div>
              <p className="text-xs text-muted-foreground">
                Ongoing: {dashboardData?.ongoingEvents || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-warning">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.activeEmployees || 0}</div>
              <p className="text-xs text-muted-foreground">
                Total: {dashboardData?.totalEmployees || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ongoing Events</CardTitle>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.ongoingEvents || 0}</div>
              <p className="text-xs text-muted-foreground">
                Recent: {dashboardData?.recentActiveEvents?.length || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Active Events</CardTitle>
            <CardDescription>
              Overview of recently created and ongoing events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData?.recentActiveEvents && dashboardData.recentActiveEvents.length > 0 ? (
                dashboardData.recentActiveEvents.slice(0, 5).map((event: any) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{event.eventName}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{event.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(event.dateAndTime).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="default">
                      Active
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No recent events found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Employees List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Employees</CardTitle>
            <CardDescription>
              Latest employees added to the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData?.employeesList && dashboardData.employeesList.length > 0 ? (
                dashboardData.employeesList.slice(0, 5).map((employee: any) => (
                  <div key={employee.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                      {employee.profileImageUrl ? (
                        <img 
                          src={employee.profileImageUrl} 
                          alt={employee.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Users className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{employee.fullName}</h3>
                      <p className="text-sm text-muted-foreground">{employee.jobTitle} • {employee.workLocation}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span>{employee.email}</span>
                        <span>{employee.phoneNumber}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={employee.isActive ? "default" : "secondary"}>
                        {employee.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        Joined: {new Date(employee.dateOfJoining).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No employees found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Employee View
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome{user?.fullName ? `, ${user.fullName}` : ''}!</h1>
        <p className="text-muted-foreground">
          {user?.fullName 
            ? 'Discover and join upcoming events' 
            : 'Complete your profile to get personalized event recommendations'
          }
        </p>
        {(!user?.fullName || !user?.jobTitle || !user?.workLocation) && (
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
              <UserCheck className="w-4 h-4" />
              <span className="text-sm font-medium">Profile Incomplete</span>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              Please complete your profile to get better event recommendations and improve your experience.
            </p>
            <Link to="/profile" className="inline-block mt-2">
              <Button size="sm" variant="outline" className="text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-800/30">
                Complete Profile
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="flex items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading events...</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Error loading events</span>
          </div>
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-3"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      )}

      {/* Events section */}
      {!loading && !error && (
        <>
          {/* Search and Filter */}
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
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                size="sm"
              >
                All Events
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

          {/* Events Sections */}
          {isAdmin ? (
            /* Admin View - Single Grid */
            filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => {
                  const eventStatus = event.status;
                  
                  return (
                    <Card key={event.id} className="h-full flex flex-col overflow-hidden">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">
                              {event.title}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {event.description}
                            </CardDescription>
                          </div>
                          <Badge 
                            variant={
                              eventStatus === 'ongoing' ? 'default' : 
                              eventStatus === 'upcoming' ? 'secondary' : 'outline'
                            }
                          >
                            {eventStatus}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="line-clamp-1">
                              {event.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>{event.date} at {event.time}</span>
                          </div>
                        </div>
                        
                        <div className="pt-4 mt-4 border-t">
                          {event.hasJoined ? (
                            <Badge variant="default" className="w-full justify-center py-2">
                              Joined
                            </Badge>
                          ) : event.isEligible ? (
                            <Link to={`/events/${event.id}`} className="block">
                              <Button className="w-full">
                                Ask to Join
                              </Button>
                            </Link>
                          ) : (
                            <Button variant="outline" disabled className="w-full">
                              Not Eligible
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No events found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'No events match your current filters. Try adjusting your search criteria.' 
                    : 'Check back later for new events.'}
                </p>
              </div>
            )
          ) : (
            /* Employee View - Categorized Sections */
            <div className="space-y-8">
              {/* Upcoming Events Section */}
              {(() => {
                const upcomingEvents = filteredEvents.filter(event => event.status === 'upcoming');
                return (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarClock className="w-5 h-5 text-blue-600" />
                      <h2 className="text-xl font-semibold text-foreground">Upcoming Events</h2>
                      <Badge variant="secondary" className="ml-2">{upcomingEvents.length}</Badge>
                    </div>
                    {upcomingEvents.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingEvents.map((event) => (
                          <Card key={event.id} className="h-full flex flex-col overflow-hidden">
                            {event.eventData && 'eventBanner' in event.eventData && (event.eventData as TrendingEvent).eventBanner && (
                              <div className="h-40 overflow-hidden">
                                <img 
                                  src={(event.eventData as TrendingEvent).eventBanner} 
                                  alt={event.title || 'Event banner'}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <CardTitle className="text-lg">
                                    {event.title}
                                  </CardTitle>
                                  <CardDescription className="mt-1">
                                    {event.eventData && 'startDate' in event.eventData 
                                      ? formatDate((event.eventData as TrendingEvent).startDate) + 
                                        ((event.eventData as TrendingEvent).endDate 
                                          ? ` - ${formatDate((event.eventData as TrendingEvent).endDate)}` 
                                          : '')
                                      : event.description}
                                  </CardDescription>
                                </div>
                                <Badge variant="secondary">
                                  upcoming
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="w-4 h-4 flex-shrink-0" />
                                  <span className="line-clamp-1">
                                    {event.location}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="pt-4 mt-4 border-t">
                                <Link to={`/events/${event.id}`} className="block">
                                  <Button className="w-full">
                                    View Details
                                  </Button>
                                </Link>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 border rounded-lg bg-muted/20">
                        <CalendarClock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No upcoming events found</p>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Ongoing Events Section */}
              {(() => {
                const ongoingEvents = filteredEvents.filter(event => event.status === 'ongoing');
                return (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <h2 className="text-xl font-semibold text-foreground">Ongoing Events</h2>
                      <Badge variant="default" className="ml-2">{ongoingEvents.length}</Badge>
                    </div>
                    {ongoingEvents.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ongoingEvents.map((event) => (
                          <Card key={event.id} className="h-full flex flex-col overflow-hidden border-green-200 dark:border-green-800">
                            {event.eventData && 'eventBanner' in event.eventData && (event.eventData as TrendingEvent).eventBanner && (
                              <div className="h-40 overflow-hidden">
                                <img 
                                  src={(event.eventData as TrendingEvent).eventBanner} 
                                  alt={event.title || 'Event banner'}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <CardTitle className="text-lg">
                                    {event.title}
                                  </CardTitle>
                                  <CardDescription className="mt-1">
                                    {event.eventData && 'startDate' in event.eventData 
                                      ? formatDate((event.eventData as TrendingEvent).startDate) + 
                                        ((event.eventData as TrendingEvent).endDate 
                                          ? ` - ${formatDate((event.eventData as TrendingEvent).endDate)}` 
                                          : '')
                                      : event.description}
                                  </CardDescription>
                                </div>
                                <Badge variant="default">
                                  ongoing
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="w-4 h-4 flex-shrink-0" />
                                  <span className="line-clamp-1">
                                    {event.location}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="pt-4 mt-4 border-t">
                                <Link to={`/events/${event.id}`} className="block">
                                  <Button className="w-full">
                                    View Details
                                  </Button>
                                </Link>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 border rounded-lg bg-muted/20">
                        <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No ongoing events found</p>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Show message if no events at all */}
              {filteredEvents.length === 0 && (
                <div className="text-center py-12 border rounded-lg">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No events found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || selectedCategory !== 'all' 
                      ? 'No events match your current filters. Try adjusting your search criteria.' 
                      : 'Check back later for new events.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;