
// Most imports are not needed as this page will just redirect.
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { Switch } from "@/components/ui/switch";
// import { UserCircle, Edit3, Save, ShieldCheck, Bell } from "lucide-react";

import { getCurrentUser } from "@/lib/auth-actions"; // This will now return null or a "non-logged-in" session
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getCurrentUser(); // This will be null in the new flow.

  // Since there's no user in an unauthenticated app, this page doesn't make sense.
  // Redirect to the main dashboard page or the application's entry point.
  if (!user) {
    redirect("/dashboard"); // Or redirect("/") if dashboard itself is not the primary view
  }

  // The remainder of the component rendering user-specific information is
  // no longer applicable and would cause errors if `user` is null.
  // A proper refactor would involve removing this page or repurposing it
  // for application settings not tied to a user.

  return (
    <div className="space-y-8 max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Profile (Disabled)</h1>
      <p className="text-muted-foreground font-mono">
        User profiles are not available in this mode. Redirecting...
      </p>
      {/* This content will likely not be seen due to the redirect. */}
    </div>
  );
}
