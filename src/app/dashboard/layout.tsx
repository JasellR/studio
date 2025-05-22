
import type { ReactNode } from "react";
// getCurrentUser and logout are no longer needed for this flow
// import { getCurrentUser, logout } from "@/lib/auth-actions";
// redirect is no longer needed for auth
// import { redirect } from "next/navigation";
// Avatar components are no longer needed as UserProfile is removed
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  // SidebarFooter, // Removed as it only contained auth-related items
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  // SidebarSeparator, // Can be removed if UserProfile was the only thing above it
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Logo } from "@/components/icons/logo";
import { PlugZap, ListCollapse, History, LayoutDashboard } from "lucide-react"; // UserCircle, LogOut, Settings removed

// UserProfile component is removed
// async function UserProfile({ user }: { user: { userName: string } }) { ... }

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Session check is removed
  // const session = await getCurrentUser();
  // if (!session || !session.isLoggedIn) {
  //   redirect("/login");
  // }

  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="sidebar" collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader className="p-4 items-center">
           <Link href="/" className="flex items-center gap-2 flex-grow" aria-label="Back to Home">
            <Logo className="h-8 w-auto"/>
          </Link>
          <div className="md:hidden"> {/* Show trigger only on small screens if sidebar is collapsible icon type */}
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          {/* UserProfile and associated Separator removed */}
          {/* <UserProfile user={{ userName: session.userName }} /> */}
          {/* <SidebarSeparator className="my-2" /> */}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard"> 
                 {/* isActive prop needs to be dynamically set based on current path */}
                <Link href="/dashboard">
                  <LayoutDashboard />
                  <span className="font-mono">Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Connect">
                <Link href="/dashboard/connect">
                  <PlugZap />
                  <span className="font-mono">Connect</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Sessions">
                <Link href="/dashboard/sessions">
                  <ListCollapse />
                  <span className="font-mono">Sessions</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Activity Logs">
                <Link href="/dashboard/logs">
                  <History />
                  <span className="font-mono">Activity Logs</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        {/* SidebarFooter and its contents (Profile, Logout) are removed */}
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6 shadow-sm">
            <div className="md:hidden"> 
                 <SidebarTrigger />
            </div>
            <h1 className="text-lg font-semibold text-foreground font-mono">RemoteFlow Dashboard</h1>
        </header>
        <main className="flex-1 p-6 overflow-auto">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
