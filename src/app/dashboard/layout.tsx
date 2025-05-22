import type { ReactNode } from "react";
import { getCurrentUser, logout } from "@/lib/auth-actions";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Logo } from "@/components/icons/logo";
import { PlugZap, ListCollapse, History, UserCircle, LogOut, Settings, LayoutDashboard } from "lucide-react";

async function UserProfile({ user }: { user: { userName: string } }) {
  return (
    <div className="flex items-center gap-3 p-2">
      <Avatar className="h-10 w-10">
        <AvatarImage src={`https://placehold.co/40x40.png?text=${user.userName.substring(0,1)}`} alt={user.userName} data-ai-hint="avatar profile" />
        <AvatarFallback>{user.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-sidebar-foreground">{user.userName}</span>
        <span className="text-xs text-muted-foreground font-mono">Online</span>
      </div>
    </div>
  );
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getCurrentUser();

  if (!session || !session.isLoggedIn) {
    redirect("/login");
  }

  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="sidebar" collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader className="p-4 items-center">
           <Link href="/dashboard" className="flex items-center gap-2 flex-grow">
            <Logo className="h-8 w-auto"/>
          </Link>
          <div className="md:hidden"> {/* Show trigger only on small screens if sidebar is collapsible icon type */}
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <UserProfile user={{ userName: session.userName }} />
          <SidebarSeparator className="my-2" />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={true} tooltip="Dashboard">
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
        <SidebarFooter className="p-2">
           <SidebarMenu>
             <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Profile">
                <Link href="/dashboard/profile">
                  <UserCircle />
                  <span className="font-mono">Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <form action={logout} className="w-full">
                <SidebarMenuButton type="submit" className="w-full" tooltip="Logout">
                  <LogOut />
                  <span className="font-mono">Logout</span>
                </SidebarMenuButton>
              </form>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6 shadow-sm">
            <div className="md:hidden"> {/* Show trigger on small screens only when not using collapsible="icon" or when it's appropriate */}
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
