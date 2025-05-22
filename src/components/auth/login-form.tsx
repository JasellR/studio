"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "@/lib/auth-actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, LogIn } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full font-mono" disabled={pending}>
      {pending ? "Signing In..." : "Sign In"}
      {!pending && <LogIn className="ml-2 h-4 w-4" />}
    </Button>
  );
}

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const initialState = { success: false, message: "" };
  const [state, dispatch] = useFormState(login, initialState);

  useEffect(() => {
    if (state?.message && !state.success) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: state.message,
      });
    }
    if (state?.success) {
      toast({
        title: "Login Successful",
        description: "Redirecting to dashboard...",
      });
      // Redirect to dashboard after successful login
      // Server action itself can't redirect with `redirect()` if called from client component after first render.
      // So we handle client-side redirect. Or the page itself can redirect.
      router.push("/dashboard");
      router.refresh(); // Ensure page reloads to reflect new auth state
    }
  }, [state, toast, router]);

  return (
    <form action={dispatch} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="font-mono">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="user@example.com"
          required
          className="font-mono"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="font-mono">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className="font-mono"
        />
      </div>
      
      {/* This alert is for non-toast error display, if needed. Current setup uses toast. */}
      {/* {state?.message && !state.success && (
        <Alert variant="destructive" className="font-mono">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )} */}

      <SubmitButton />
    </form>
  );
}
