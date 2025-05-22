"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Keyboard, Monitor, Copy, LogOut, ScreenShare, Settings2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { RdpConnectionState } from "./connection-form"; // Import the interface
import { Progress } from "@/components/ui/progress";


export function RdpClientMock() {
  const [connectionState, setConnectionState] = useState<RdpConnectionState>({ isConnected: false, statusMessage: "Not Connected. Please enter details and connect." });
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleConnectionUpdate = (event: CustomEvent<RdpConnectionState>) => {
      setIsLoading(true);
      setProgress(0);
      
      // Simulate loading progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 20;
        if (currentProgress <= 100) {
          setProgress(currentProgress);
        } else {
          clearInterval(interval);
          setIsLoading(false);
          setConnectionState(event.detail);
        }
      }, 250); // update progress every 250ms
    };

    document.addEventListener('rdpConnectionUpdate', handleConnectionUpdate as EventListener);
    return () => {
      document.removeEventListener('rdpConnectionUpdate', handleConnectionUpdate as EventListener);
    };
  }, []);

  const handleDisconnect = () => {
    setConnectionState({ isConnected: false, statusMessage: "Disconnected by user." });
    // Optionally, inform the ConnectionForm or backend
     document.dispatchEvent(new CustomEvent<RdpConnectionState>('rdpConnectionUpdate', { 
          detail: { isConnected: false, statusMessage: "Disconnected by user." } 
     }));
  };

  return (
    <Card className="flex-1 flex flex-col shadow-xl h-full min-h-[600px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Remote Desktop Session</CardTitle>
        <div className={`w-3 h-3 rounded-full ${connectionState.isConnected ? 'bg-green-500' : 'bg-red-500'}`} title={connectionState.isConnected ? 'Connected' : 'Disconnected'}></div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center bg-muted/20 p-2 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10">
            <p className="text-lg mb-2 font-mono">Establishing Connection...</p>
            <Progress value={progress} className="w-1/2" />
          </div>
        )}
        {!isLoading && connectionState.isConnected && connectionState.host ? (
          <div className="w-full h-full bg-black rounded-md overflow-hidden relative">
            <Image 
              src={`https://placehold.co/1200x800.png?text=Connected+to+${connectionState.host}`} 
              alt={`Remote desktop view of ${connectionState.host}`}
              layout="fill"
              objectFit="contain" // 'cover' or 'contain' depending on desired effect
              data-ai-hint="desktop screen"
            />
            <div className="absolute top-2 left-2 bg-black/50 text-white p-2 rounded font-mono text-xs">
              Displaying: {connectionState.host}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Monitor size={64} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground font-mono text-lg">{connectionState.statusMessage}</p>
            {!connectionState.isConnected && !isLoading && <p className="text-sm text-muted-foreground font-mono mt-2">Use the form to initiate a new connection.</p>}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t flex flex-wrap gap-2 justify-center">
        <Button variant="outline" className="font-mono" disabled={!connectionState.isConnected}>
          <Keyboard className="mr-2 h-4 w-4" /> Keyboard
        </Button>
        <Button variant="outline" className="font-mono" disabled={!connectionState.isConnected}>
          <Copy className="mr-2 h-4 w-4" /> Clipboard
        </Button>
         <Button variant="outline" className="font-mono" disabled={!connectionState.isConnected}>
          <ScreenShare className="mr-2 h-4 w-4" /> Display
        </Button>
         <Button variant="outline" className="font-mono" disabled={!connectionState.isConnected}>
          <Settings2 className="mr-2 h-4 w-4" /> Settings
        </Button>
        <Button variant="destructive" className="font-mono" onClick={handleDisconnect} disabled={!connectionState.isConnected}>
          <LogOut className="mr-2 h-4 w-4" /> Disconnect
        </Button>
      </CardFooter>
    </Card>
  );
}
