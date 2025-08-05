import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Clock, 
  UserCheck, 
  UserX, 
  Loader2, 
  AlertTriangle,
  CheckCircle 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PunchInButtonProps {
  eventId: string;
  eventTitle: string;
  eventLocation: string;
  eventCoordinates?: { lat: number; lng: number };
  isActive: boolean;
  hasJoined: boolean;
  className?: string;
}

interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}

const PunchInButton: React.FC<PunchInButtonProps> = ({
  eventId,
  eventTitle,
  eventLocation,
  eventCoordinates,
  isActive,
  hasJoined,
  className = ""
}) => {
  const { toast } = useToast();
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState<string | null>(null);

  // Geofence radius in meters (adjust as needed)
  const GEOFENCE_RADIUS = 100;

  const calculateDistance = (
    lat1: number, 
    lng1: number, 
    lat2: number, 
    lng2: number
  ): number => {
    const R = 6371000; // Earth's radius in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getCurrentLocation = (): Promise<GeolocationCoordinates> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          let errorMessage = 'Unable to retrieve location';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  };

  const handlePunchIn = async () => {
    if (!isActive || !hasJoined) {
      toast({
        title: "Cannot Punch In",
        description: "Event is not active or you haven't joined this event.",
        variant: "destructive"
      });
      return;
    }

    setIsCheckingLocation(true);
    setLocationError(null);

    try {
      const location = await getCurrentLocation();
      setUserLocation(location);

      // Check if event has coordinates for geofencing
      if (eventCoordinates) {
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          eventCoordinates.lat,
          eventCoordinates.lng
        );

        if (distance > GEOFENCE_RADIUS) {
          setLocationError(`You are ${Math.round(distance)}m away from the event location. You need to be within ${GEOFENCE_RADIUS}m to punch in.`);
          toast({
            title: "Location Check Failed",
            description: `You're too far from the event location (${Math.round(distance)}m away)`,
            variant: "destructive"
          });
          return;
        }
      }

      // Simulate punch in API call
      setTimeout(() => {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        setIsPunchedIn(true);
        setPunchInTime(time);
        
        toast({
          title: "Punched In Successfully",
          description: `You've been checked in to ${eventTitle} at ${time}`,
        });
      }, 1000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Location access failed';
      setLocationError(errorMessage);
      toast({
        title: "Location Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsCheckingLocation(false);
    }
  };

  const handlePunchOut = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    setIsPunchedIn(false);
    setPunchInTime(null);
    
    toast({
      title: "Punched Out Successfully",
      description: `You've been checked out from ${eventTitle} at ${time}`,
    });
  };

  if (!isActive || !hasJoined) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Attendance
          </CardTitle>
          <CardDescription>
            Punch in when the event starts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button disabled className="w-full">
            Event Not Active
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isPunchedIn ? (
            <CheckCircle className="w-5 h-5 text-success" />
          ) : (
            <Clock className="w-5 h-5" />
          )}
          Attendance
        </CardTitle>
        <CardDescription>
          {isPunchedIn 
            ? `Checked in at ${punchInTime}` 
            : 'Punch in to mark your attendance'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {userLocation && (
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Location: {userLocation.latitude.toFixed(6)}, {userLocation.longitude.toFixed(6)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Accuracy: ±{Math.round(userLocation.accuracy)}m
            </div>
          </div>
        )}

        {locationError && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
              <p className="text-sm text-destructive">{locationError}</p>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {!isPunchedIn ? (
            <Button 
              onClick={handlePunchIn}
              disabled={isCheckingLocation}
              className="w-full gap-2"
            >
              {isCheckingLocation ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Checking Location...
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  Punch In
                </>
              )}
            </Button>
          ) : (
            <Button 
              onClick={handlePunchOut}
              variant="outline"
              className="w-full gap-2"
            >
              <UserX className="w-4 h-4" />
              Punch Out
            </Button>
          )}
        </div>

        {eventCoordinates && (
          <div className="text-xs text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              Geofence: {GEOFENCE_RADIUS}m radius
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PunchInButton;