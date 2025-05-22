import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ListCollapse, PlayCircle, StopCircle, History, RefreshCw } from "lucide-react";
import Image from "next/image";

interface Session {
  id: string;
  hostName: string;
  userName: string;
  startTime: string;
  status: "active" | "inactive" | "disconnected";
  thumbnailUrl: string;
  osIconHint: string;
}

const mockSessions: Session[] = [
  {
    id: "session-1",
    hostName: "PROD-SERVER-01",
    userName: "j.doe",
    startTime: "2023-10-26 10:00 AM",
    status: "active",
    thumbnailUrl: "https://placehold.co/300x200.png?text=PROD-SERVER-01",
    osIconHint: "windows server"
  },
  {
    id: "session-2",
    hostName: "DEV-UBUNTU-VM",
    userName: "a.smith",
    startTime: "2023-10-26 09:15 AM",
    status: "inactive",
    thumbnailUrl: "https://placehold.co/300x200.png?text=DEV-UBUNTU-VM",
    osIconHint: "linux desktop"
  },
  {
    id: "session-3",
    hostName: "WIN11-DESKTOP",
    userName: "m.jones",
    startTime: "2023-10-25 03:30 PM",
    status: "disconnected",
    thumbnailUrl: "https://placehold.co/300x200.png?text=WIN11-DESKTOP",
    osIconHint: "windows desktop"
  },
];

function SessionCard({ session }: { session: Session }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{session.hostName}</CardTitle>
            <CardDescription className="font-mono">User: {session.userName}</CardDescription>
          </div>
          <Badge variant={session.status === "active" ? "default" : session.status === "inactive" ? "secondary" : "destructive"} className="capitalize font-mono">
            {session.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="aspect-[3/2] bg-muted rounded-md overflow-hidden mb-4 relative">
          <Image 
            src={session.thumbnailUrl} 
            alt={`Thumbnail for ${session.hostName}`} 
            layout="fill"
            objectFit="cover"
            data-ai-hint={session.osIconHint}
          />
        </div>
        <p className="text-sm text-muted-foreground font-mono">Started: {session.startTime}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 font-mono" disabled={session.status !== "active" && session.status !== "inactive"}>
          <PlayCircle className="mr-2 h-4 w-4" /> {session.status === "active" ? "Reconnect" : "Connect"}
        </Button>
        <Button variant="outline" size="sm" className="font-mono" disabled={session.status !== "active"}>
          <StopCircle className="mr-2 h-4 w-4" /> Terminate
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function SessionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <ListCollapse className="mr-3 h-8 w-8 text-primary" /> Session Management
          </h1>
          <p className="text-muted-foreground font-mono">
            View and manage your active and past RDP sessions.
          </p>
        </div>
        <Button variant="outline" className="font-mono">
            <RefreshCw className="mr-2 h-4 w-4"/> Refresh Sessions
        </Button>
      </div>
      
      {mockSessions.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockSessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardHeader>
            <History size={48} className="mx-auto text-muted-foreground mb-4" />
            <CardTitle>No Sessions Found</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="font-mono">
              You currently have no active or recent RDP sessions.
            </CardDescription>
          </CardContent>
          <CardFooter className="justify-center">
            <Button asChild className="font-mono">
              <Link href="/dashboard/connect">Connect to a Desktop</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
