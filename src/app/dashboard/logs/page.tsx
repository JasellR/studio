import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { History, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface LogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  status: "success" | "failure" | "info";
  ipAddress: string;
}

const mockLogs: LogEntry[] = [
  {
    id: "log-1",
    timestamp: "2023-10-26 10:05 AM",
    user: "j.doe",
    action: "Session Start",
    details: "Connected to PROD-SERVER-01",
    status: "success",
    ipAddress: "192.168.1.101",
  },
  {
    id: "log-2",
    timestamp: "2023-10-26 09:20 AM",
    user: "a.smith",
    action: "Login Attempt",
    details: "Failed login for user 'a.smith'",
    status: "failure",
    ipAddress: "10.0.0.5",
  },
  {
    id: "log-3",
    timestamp: "2023-10-26 09:15 AM",
    user: "a.smith",
    action: "Session Inactive",
    details: "Session to DEV-UBUNTU-VM timed out",
    status: "info",
    ipAddress: "10.0.0.5",
  },
  {
    id: "log-4",
    timestamp: "2023-10-25 04:00 PM",
    user: "m.jones",
    action: "Session End",
    details: "Disconnected from WIN11-DESKTOP",
    status: "success",
    ipAddress: "172.16.0.12",
  },
   {
    id: "log-5",
    timestamp: "2023-10-25 03:30 PM",
    user: "m.jones",
    action: "Clipboard Use",
    details: "Copied 256 bytes from remote",
    status: "info",
    ipAddress: "172.16.0.12",
  },
];

export default function LogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <History className="mr-3 h-8 w-8 text-primary" /> Activity Logs
          </h1>
          <p className="text-muted-foreground font-mono">
            Monitor user activities and system events for security and compliance.
          </p>
        </div>
         <Button variant="outline" className="font-mono">
          <Download className="mr-2 h-4 w-4" /> Export Logs
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <CardTitle>Log Entries</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <Input placeholder="Filter logs..." className="max-w-xs font-mono" />
              <Select>
                <SelectTrigger className="w-[180px] font-mono">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="font-mono">All Statuses</SelectItem>
                  <SelectItem value="success" className="font-mono">Success</SelectItem>
                  <SelectItem value="failure" className="font-mono">Failure</SelectItem>
                  <SelectItem value="info" className="font-mono">Info</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" aria-label="Apply filters">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-mono">Timestamp</TableHead>
                <TableHead className="font-mono">User</TableHead>
                <TableHead className="font-mono">Action</TableHead>
                <TableHead className="font-mono">Details</TableHead>
                <TableHead className="font-mono">Status</TableHead>
                <TableHead className="font-mono hidden md:table-cell">IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                  <TableCell className="font-mono">{log.user}</TableCell>
                  <TableCell className="font-mono">{log.action}</TableCell>
                  <TableCell className="font-mono text-sm max-w-xs truncate" title={log.details}>{log.details}</TableCell>
                  <TableCell>
                    <Badge
                      variant={log.status === "success" ? "default" : log.status === "failure" ? "destructive" : "secondary"}
                      className="capitalize font-mono"
                    >
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono hidden md:table-cell">{log.ipAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
