
import React from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ClientPortalLayoutProps {
  children: React.ReactNode;
  clientData?: {
    name: string;
    logoUrl?: string;
    brandColor?: string;
  };
}

export function ClientPortalLayout({ children, clientData }: ClientPortalLayoutProps) {
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
        />
        <ScrollArea className="flex-1">
          <main className="p-6 h-full">
            {/* Client welcome banner */}
            <div className="mb-6 p-4 rounded-lg bg-muted border border-border">
              <h2 className="text-xl font-medium mb-1">
                Welcome to your project portal
              </h2>
              <p className="text-muted-foreground">
                Track deliverables, provide feedback, and view project progress all in one place.
              </p>
            </div>
            
            {children}
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
