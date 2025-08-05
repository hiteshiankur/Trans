import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileText, 
  Calendar, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EventParticipant {
  id: string;
  name: string;
  email: string;
  joinRequestStatus: 'accepted' | 'rejected' | 'pending';
  punchInTime?: string;
  punchOutTime?: string;
  attendanceStatus: 'joined' | 'no-show' | 'pending';
}

interface EventReportData {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  totalInvitees: number;
  acceptedInvitees: number;
  attendees: number;
  participants: EventParticipant[];
}

interface ReportExporterProps {
  eventData: EventReportData;
  className?: string;
}

const ReportExporter: React.FC<ReportExporterProps> = ({
  eventData,
  className = ""
}) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const generateReportContent = (): string => {
    const {
      eventTitle,
      eventDate,
      eventTime,
      eventLocation,
      totalInvitees,
      acceptedInvitees,
      attendees,
      participants
    } = eventData;

    // Generate a simple text-based report (in a real app, this would generate a proper DOC file)
    let content = `EVENT ATTENDANCE REPORT\n`;
    content += `${'='.repeat(50)}\n\n`;
    content += `Event: ${eventTitle}\n`;
    content += `Date: ${eventDate}\n`;
    content += `Time: ${eventTime}\n`;
    content += `Location: ${eventLocation}\n\n`;
    
    content += `SUMMARY\n`;
    content += `${'='.repeat(20)}\n`;
    content += `Total Invitees: ${totalInvitees}\n`;
    content += `Accepted Invitations: ${acceptedInvitees}\n`;
    content += `Actual Attendees: ${attendees}\n`;
    content += `Attendance Rate: ${acceptedInvitees > 0 ? Math.round((attendees / acceptedInvitees) * 100) : 0}%\n\n`;
    
    content += `PARTICIPANT DETAILS\n`;
    content += `${'='.repeat(30)}\n`;
    content += `${'Name'.padEnd(20)} | ${'Email'.padEnd(25)} | ${'Status'.padEnd(12)} | ${'Punch In'.padEnd(10)} | ${'Punch Out'.padEnd(10)} | ${'Attendance'}\n`;
    content += `${'-'.repeat(20)} | ${'-'.repeat(25)} | ${'-'.repeat(12)} | ${'-'.repeat(10)} | ${'-'.repeat(10)} | ${'-'.repeat(12)}\n`;
    
    participants.forEach(participant => {
      const name = participant.name.padEnd(20);
      const email = participant.email.padEnd(25);
      const status = participant.joinRequestStatus.padEnd(12);
      const punchIn = (participant.punchInTime || 'N/A').padEnd(10);
      const punchOut = (participant.punchOutTime || 'N/A').padEnd(10);
      const attendance = participant.attendanceStatus;
      
      content += `${name} | ${email} | ${status} | ${punchIn} | ${punchOut} | ${attendance}\n`;
    });
    
    content += `\n\nReport generated on: ${new Date().toLocaleString()}\n`;
    
    return content;
  };

  const exportReport = async () => {
    setIsExporting(true);
    
    try {
      // Simulate report generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const content = generateReportContent();
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${eventData.eventTitle.replace(/\s+/g, '_')}_Report_${eventData.eventDate}.txt`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      toast({
        title: "Report Exported",
        description: `Attendance report for "${eventData.eventTitle}" has been downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to generate the report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
      case 'joined':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'rejected':
      case 'no-show':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <Users className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'accepted':
      case 'joined':
        return 'default';
      case 'rejected':
      case 'no-show':
        return 'destructive';
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Event Report
        </CardTitle>
        <CardDescription>
          Export detailed attendance report for {eventData.eventTitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{eventData.totalInvitees}</div>
            <div className="text-xs text-muted-foreground">Total Invitees</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-success">{eventData.acceptedInvitees}</div>
            <div className="text-xs text-muted-foreground">Accepted</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-warning">{eventData.attendees}</div>
            <div className="text-xs text-muted-foreground">Attended</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground">
              {eventData.acceptedInvitees > 0 
                ? Math.round((eventData.attendees / eventData.acceptedInvitees) * 100)
                : 0}%
            </div>
            <div className="text-xs text-muted-foreground">Attendance Rate</div>
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-2">
          <h4 className="font-medium">Event Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>{eventData.eventDate} at {eventData.eventTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>{eventData.eventLocation}</span>
            </div>
          </div>
        </div>

        {/* Participant Preview */}
        <div className="space-y-3">
          <h4 className="font-medium">Participant Status Preview</h4>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {eventData.participants.slice(0, 5).map((participant) => (
              <div key={participant.id} className="flex items-center justify-between p-2 border rounded text-sm">
                <div>
                  <div className="font-medium">{participant.name}</div>
                  <div className="text-xs text-muted-foreground">{participant.email}</div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={getStatusVariant(participant.joinRequestStatus)} className="text-xs">
                    {getStatusIcon(participant.joinRequestStatus)}
                    {participant.joinRequestStatus}
                  </Badge>
                  <Badge variant={getStatusVariant(participant.attendanceStatus)} className="text-xs">
                    {getStatusIcon(participant.attendanceStatus)}
                    {participant.attendanceStatus}
                  </Badge>
                </div>
              </div>
            ))}
            {eventData.participants.length > 5 && (
              <div className="text-center text-sm text-muted-foreground">
                +{eventData.participants.length - 5} more participants
              </div>
            )}
          </div>
        </div>

        {/* Export Button */}
        <Button 
          onClick={exportReport}
          disabled={isExporting}
          className="w-full gap-2"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating Report...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Export Report (.txt)
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Report includes participant details, attendance status, and punch-in/out times
        </p>
      </CardContent>
    </Card>
  );
};

export default ReportExporter;