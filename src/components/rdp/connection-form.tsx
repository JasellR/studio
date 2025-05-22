
"use client";

import { useFormStatus } from "react-dom"; // useFormStatus is still from react-dom
import { useActionState } from "react"; // useActionState is from react
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useRef } from "react";
import { PlugZap } from "lucide-react";

// Mock server action for connection
async function connectRdp(prevState: any, formData: FormData) {
  const host = formData.get("host");
  const username = formData.get("username");
  const password = formData.get("password");

  // Basic validation for required fields in the action itself
  if (!host || !username || !password) {
    let missingFields = [];
    if (!host) missingFields.push("host");
    if (!username) missingFields.push("username");
    if (!password) missingFields.push("password");
    return { success: false, message: `Missing required fields: ${missingFields.join(', ')}.` };
  }
  
  await new Promise(resolve => setTimeout(resolve, 1500)); 
  
  if (host === "error.test") {
    return { success: false, message: `Failed to connect to ${host}. Host not found.` };
  }
  return { success: true, message: `Successfully initiated connection to ${host}.`, host };
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full font-mono" disabled={pending}>
      {pending ? "Connecting..." : "Connect"}
      {!pending && <PlugZap className="ml-2 h-4 w-4" />}
    </Button>
  );
}

export interface RdpConnectionState {
  isConnected: boolean;
  host?: string;
  statusMessage?: string;
}

export function ConnectionForm({ initialHost }: { initialHost?: string }) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const initialState = { success: false, message: "", host: "" };
  const [state, dispatch] = useActionState(connectRdp, initialState); // Updated here

  // Use a ref for the host input to set its value if initialHost is provided
  const hostInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialHost && hostInputRef.current) {
      hostInputRef.current.value = initialHost;
      // If you want to auto-submit or focus other fields, you can add logic here.
      // For example, to focus the username field if host is pre-filled:
      const usernameInput = formRef.current?.elements.namedItem("username") as HTMLInputElement;
      if (usernameInput) {
        usernameInput.focus();
      }
    }
  }, [initialHost]);

  useEffect(() => {
    if (state?.message) {
      if(state.success) {
        toast({
          title: "Connection Update",
          description: state.message,
        });
        document.dispatchEvent(new CustomEvent<RdpConnectionState>('rdpConnectionUpdate', { 
          detail: { isConnected: true, host: state.host as string, statusMessage: `Connected to ${state.host}` } 
        }));
      } else {
         toast({
          variant: "destructive",
          title: "Connection Failed",
          description: state.message,
        });
         document.dispatchEvent(new CustomEvent<RdpConnectionState>('rdpConnectionUpdate', { 
          detail: { isConnected: false, statusMessage: state.message } 
        }));
      }
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={dispatch} className="space-y-4">
      <div>
        <Label htmlFor="host" className="font-mono">Host Address</Label>
        <Input 
          ref={hostInputRef} // Attach ref here
          id="host" 
          name="host" 
          placeholder="e.g., 192.168.1.100 or mydesktop.example.com" 
          required 
          className="font-mono"
          defaultValue={initialHost || ""} // Also set defaultValue for initial render
        />
      </div>
      <div>
        <Label htmlFor="port" className="font-mono">Port (Optional)</Label>
        <Input id="port" name="port" type="number" placeholder="3389" className="font-mono"/>
      </div>
      <div>
        <Label htmlFor="username" className="font-mono">Username</Label>
        <Input id="username" name="username" placeholder="Your username" required className="font-mono"/>
      </div>
      <div>
        <Label htmlFor="password" className="font-mono">Password</Label>
        <Input id="password" name="password" type="password" placeholder="••••••••" required className="font-mono"/>
      </div>
      <SubmitButton />
    </form>
  );
}
