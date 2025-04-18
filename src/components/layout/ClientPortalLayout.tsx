
import React from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lock, Shield } from "lucide-react";

interface ClientPortalLayoutProps {
  children: React.ReactNode;
  clientData?: {
    name: string;
    logoUrl?: string;
    brandColor?: string;
  };
  passwordProtected?: boolean;
}

export function ClientPortalLayout({ 
  children, 
  clientData,
  passwordProtected = false
}: ClientPortalLayoutProps) {
  // Client branding configuration
  const clientBranding = {
    primaryColor: clientData?.brandColor || "#8A63D2", // Default to app purple if no brand color
    logoUrl: clientData?.logoUrl
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 h-full">
        <Sidebar 
          userRole="client" 
          clientBranding={clientBranding}
        />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar 
          isClientPortal={true} 
          clientName={clientData?.name || "Client Portal"}
          passwordProtected={passwordProtected}
        />
        <ScrollArea className="flex-1">
          <main className="p-6 h-full">
            {/* Client welcome banner */}
            <div className="mb-6 p-4 rounded-lg bg-muted/40 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-medium mb-1">
                    Welcome to your project portal
                  </h2>
                  <p className="text-muted-foreground">
                    Track deliverables, provide feedback, and view project progress all in one place.
                  </p>
                </div>
                {passwordProtected && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 px-3 py-1 rounded-full border">
                    <Lock className="h-3.5 w-3.5" />
                    Password Protected
                  </div>
                )}
              </div>
            </div>
            
            {/* Client notice about view-only permissions */}
            <div className="mb-6 p-3 rounded-lg bg-blue-50 border border-blue-100 flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Client View Mode:</span> You can provide feedback and approve deliverables, but cannot modify project details.
                </p>
              </div>
            </div>
            
            {children}
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
