"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { PlugZap } from "lucide-react";

// Mock server action for connection
async function connectRdp(prevState: any, formData: FormData) {
  const host = formData.get("host");
  // In a real app, this would attempt to establish an RDP connection
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
  
  // Simulate connection success/failure
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

// Define a type for the state of RdpClientMock, to be passed via event or context
export interface RdpConnectionState {
  isConnected: boolean;
  host?: string;
  statusMessage?: string;
}


export function ConnectionForm() {
  const { toast } = useToast();
  const initialState = { success: false, message: "", host: "" };
  const [state, dispatch] = useFormState(connectRdp, initialState);

  useEffect(() => {
    if (state?.message) {
      if(state.success) {
        toast({
          title: "Connection Update",
          description: state.message,
        });
        // Dispatch a custom event to update RdpClientMock
        // This is a way for sibling components to communicate without complex prop drilling or context for this specific case.
        // A more robust solution might use a shared state (Context, Zustand, etc.)
        document.dispatchEvent(new CustomEvent<RdpConnectionState>('rdpConnectionUpdate', { 
          detail: { isConnected: true, host: state.host, statusMessage: `Connected to ${state.host}` } 
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
    <form action={dispatch} className="space-y-4">
      <div>
        <Label htmlFor="host" className="font-mono">Host Address</Label>
        <Input id="host" name="host" placeholder="e.g., 192.168.1.100 or mydesktop.example.com" required className="font-mono"/>
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
