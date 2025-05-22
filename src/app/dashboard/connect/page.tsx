
import { ConnectionForm } from "@/components/rdp/connection-form";
import { RdpClientMock } from "@/components/rdp/rdp-client-mock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ConnectPage({ searchParams }: { searchParams?: { host?: string } }) {
  const initialHost = searchParams?.host;

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      <Card className="lg:w-1/3 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">New Connection</CardTitle>
          <CardDescription className="font-mono">
            {initialHost ? `Connecting to: ${initialHost}` : "Enter remote desktop details to connect."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ConnectionForm initialHost={initialHost} />
        </CardContent>
      </Card>
      <div className="lg:w-2/3 flex flex-col">
        <RdpClientMock />
      </div>
    </div>
  );
}

