
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useParams } from "react-router-dom";
import { ClientHistory as ClientHistoryComponent } from "@/components/client/ClientHistory";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const ClientHistory = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [clientData, setClientData] = React.useState<{ id: string; name: string } | null>(null);

  // Mock client data loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setClientData({
        id: clientId || "1",
        name: "Acme Inc."
      });
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [clientId]);
  
  return (
    <MainLayout>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4" 
          onClick={() => navigate('/clients')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Clients
        </Button>
        
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold">{clientData?.name}</h1>
            <p className="text-muted-foreground">Client History & Timeline</p>
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {isLoading ? (
            <Skeleton className="h-[600px] w-full" />
          ) : (
            <ClientHistoryComponent 
              clientId={clientData?.id || ""} 
              clientName={clientData?.name || ""} 
            />
          )}
        </div>
        
        <div>
          <div className="space-y-6">
            {isLoading ? (
              <>
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-[200px] w-full" />
              </>
            ) : (
              <>
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-medium">Client Details</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Email:</span>
                      <span>contact@acmeinc.com</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>(555) 123-4567</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Client Since:</span>
                      <span>Jan 15, 2025</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    Edit Client
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-medium">Billing Summary</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Projects:</span>
                      <span>2 Active</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Invoiced:</span>
                      <span className="font-medium">$7,250</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Outstanding:</span>
                      <span className="text-amber-600 font-medium">$1,200</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Payment:</span>
                      <span>Mar 30, 2025</span>
                    </div>
                  </div>
                  
                  <Button size="sm" className="w-full">
                    Create Invoice
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ClientHistory;
