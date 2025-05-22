
import { connectToHostAction } from '@/app/actions';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons/logo";
import { PlugZap, AlertTriangle } from "lucide-react";
import Image from 'next/image';

function SubmitButton() {
  // useFormStatus no es necesario aquí ya que no estamos usando useFormState para este formulario simple
  return (
    <Button type="submit" className="w-full font-mono">
      Connect
      <PlugZap className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default function HomePage({ searchParams }: { searchParams?: { error?: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-background to-muted/30">
      <div className="w-full max-w-xl">
        <Card className="shadow-2xl border-border/50 overflow-hidden">
          <CardHeader className="items-center text-center p-8 bg-card/80 backdrop-blur-sm">
            <Logo className="mb-4 h-14 w-auto" />
            <CardTitle className="text-4xl font-bold text-primary">RemoteFlow</CardTitle>
            <CardDescription className="font-mono text-lg text-muted-foreground mt-1">
              Direct Access to Your Remote Desktops
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2 w-full flex justify-center md:justify-start">
                <Image
                  src="https://placehold.co/300x350.png"
                  alt="Secure Connection Illustration"
                  width={300}
                  height={350}
                  className="rounded-lg shadow-lg object-cover"
                  data-ai-hint="server connection"
                />
              </div>
              <div className="md:col-span-3 w-full">
                <form action={connectToHostAction} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="host" className="font-mono text-base">Host Address or IP</Label>
                    <Input
                      id="host"
                      name="host"
                      type="text"
                      placeholder="e.g., 192.168.1.100 or server.domain.com"
                      required
                      className="font-mono text-base p-3"
                      aria-describedby="host-error"
                    />
                  </div>

                  {searchParams?.error && (
                    <div id="host-error" className="flex items-center text-sm text-destructive p-3 bg-destructive/10 rounded-md border border-destructive/30">
                      <AlertTriangle className="h-5 w-5 mr-2 shrink-0" />
                      <span>{searchParams.error}</span>
                    </div>
                  )}
                  <SubmitButton />
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
        <p className="mt-8 text-center text-sm text-muted-foreground font-mono">
          Enter the target machine's address to initiate a secure RDP session.
        </p>
      </div>
    </main>
  );
}
