import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/icons/logo";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user && user.isLoggedIn) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="items-center text-center">
            <Logo className="mb-4 h-12 w-auto" />
            <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="font-mono">
              Sign in to access your remote sessions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
        <p className="mt-6 text-center text-sm text-muted-foreground font-mono">
          Secure. Reliable. RemoteFlow.
        </p>
      </div>
    </main>
  );
}
