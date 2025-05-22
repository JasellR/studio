import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { getCurrentUser } from "@/lib/auth-actions"; // Using auth-actions for current user as an example
import { UserCircle, Edit3, Save, ShieldCheck, Bell } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login"); // Should not happen due to layout protection, but good practice
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <UserCircle className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">User Profile</h1>
          <p className="text-muted-foreground font-mono">Manage your account settings and preferences.</p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription className="font-mono">View and update your personal details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-6">
            <Avatar className="h-24 w-24">
               <AvatarImage src={`https://placehold.co/96x96.png?text=${user.userName.substring(0,1)}`} alt={user.userName} data-ai-hint="avatar profile large"/>
              <AvatarFallback className="text-3xl">{user.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <Label htmlFor="fullName" className="font-mono">Full Name</Label>
              <Input id="fullName" defaultValue={user.userName} className="font-mono text-lg" />
            </div>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="email" className="font-mono">Email Address</Label>
            <Input id="email" type="email" defaultValue={`${user.userId}@example.com`} readOnly className="font-mono bg-muted/50" />
            <p className="text-xs text-muted-foreground font-mono">Email address cannot be changed.</p>
          </div>
          <Button className="font-mono">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </CardContent>
      </Card>

      <Separator />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription className="font-mono">Manage your account security options.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-mono text-base">Two-Factor Authentication (2FA)</Label>
              <p className="text-sm text-muted-foreground font-mono">Enhance your account security by enabling 2FA.</p>
            </div>
            <Switch id="twoFactorAuth" defaultChecked />
          </div>
           <Button variant="outline" className="font-mono">
            <ShieldCheck className="mr-2 h-4 w-4" /> Configure 2FA
          </Button>
          <Button variant="outline" className="font-mono">
            Change Password
          </Button>
        </CardContent>
      </Card>
      
      <Separator />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription className="font-mono">Control how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between">
            <Label htmlFor="emailNotifications" className="font-mono">Email Notifications for Critical Alerts</Label>
            <Switch id="emailNotifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sessionNotifications" className="font-mono">Notifications for Session Start/End</Label>
            <Switch id="sessionNotifications" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
