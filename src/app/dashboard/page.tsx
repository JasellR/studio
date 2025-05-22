import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BarChart3, PlugZap, ListCollapse, History } from "lucide-react";
import Image from "next/image";

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8">
      <Card className="bg-card/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Welcome to RemoteFlow</CardTitle>
          <CardDescription className="text-lg text-muted-foreground font-mono">
            Your secure gateway to remote desktops. Manage connections, view activity, and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-4">
            <p className="font-mono">
              RemoteFlow provides a seamless and secure web-based RDP experience. 
              Start by connecting to a remote host or explore your session history and activity logs.
            </p>
            <Button asChild size="lg" className="font-mono">
              <Link href="/dashboard/connect">
                Connect to a Desktop <PlugZap className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="flex-shrink-0">
            <Image 
              src="https://placehold.co/300x200.png" 
              alt="Remote Desktop Illustration" 
              width={300} 
              height={200}
              className="rounded-lg shadow-md"
              data-ai-hint="network connection"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          title="Manage Connections"
          description="Easily initiate and manage your RDP sessions."
          icon={<PlugZap className="h-8 w-8 text-primary" />}
          link="/dashboard/connect"
          linkText="Connect Now"
        />
        <FeatureCard
          title="Session History"
          description="Review past and active remote sessions."
          icon={<ListCollapse className="h-8 w-8 text-primary" />}
          link="/dashboard/sessions"
          linkText="View Sessions"
        />
        <FeatureCard
          title="Activity Logs"
          description="Track user activities for security and compliance."
          icon={<History className="h-8 w-8 text-primary" />}
          link="/dashboard/logs"
          linkText="Check Logs"
        />
      </div>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  linkText: string;
}

function FeatureCard({ title, description, icon, link, linkText }: FeatureCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start gap-4">
        {icon}
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="font-mono">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Button variant="outline" asChild className="w-full font-mono">
          <Link href={link}>
            {linkText} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
