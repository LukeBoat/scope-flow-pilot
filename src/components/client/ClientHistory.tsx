
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, FileText, ReceiptIcon } from "lucide-react";

interface TimelineEvent {
  id: string;
  type: "approval" | "revision" | "invoice" | "deliverable";
  title: string;
  description: string;
  date: Date;
  status?: "approved" | "rejected" | "pending" | "paid";
  projectId: string;
  projectName: string;
}

interface ClientHistoryProps {
  clientId: string;
  clientName: string;
}

export function ClientHistory({ clientId, clientName }: ClientHistoryProps) {
  // Mock timeline data
  const timelineEvents: TimelineEvent[] = [
    {
      id: "evt1",
      type: "deliverable",
      title: "Homepage Design Delivered",
      description: "Initial homepage design delivered for review.",
      date: new Date("2025-04-10"),
      status: "approved",
      projectId: "p1",
      projectName: "Website Redesign"
    },
    {
      id: "evt2",
      type: "revision",
      title: "Revision Requested",
      description: "Client requested changes to the color scheme.",
      date: new Date("2025-04-08"),
      status: "pending",
      projectId: "p1",
      projectName: "Website Redesign"
    },
    {
      id: "evt3",
      type: "approval",
      title: "Logo Design Approved",
      description: "New logo design was approved.",
      date: new Date("2025-04-05"),
      status: "approved",
      projectId: "p1",
      projectName: "Website Redesign"
    },
    {
      id: "evt4",
      type: "invoice",
      title: "Invoice INV-002",
      description: "Invoice for initial project deposit.",
      date: new Date("2025-04-01"),
      status: "paid",
      projectId: "p1",
      projectName: "Website Redesign"
    },
  ];

  // Get the icon based on event type
  const getEventIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "approval":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "revision":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "invoice":
        return <ReceiptIcon className="h-4 w-4 text-blue-500" />;
      case "deliverable":
        return <FileText className="h-4 w-4 text-purple-500" />;
    }
  };

  // Get the badge variant based on status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Client History</CardTitle>
        <CardDescription>Timeline of activities for {clientName}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="timeline">
          <TabsList className="mb-4 grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="timeline">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:h-[calc(100%-24px)] before:w-0.5 before:bg-border">
                {timelineEvents.map((event) => (
                  <div key={event.id} className="flex items-start ml-2 pl-6 relative">
                    <div className="absolute left-0 top-0 bg-white p-1 rounded-full border">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="bg-white border rounded-lg p-3 shadow-sm w-full hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{event.title}</span>
                        <Badge className={getBadgeVariant(event.status || "")}>
                          {event.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{event.projectName}</span>
                        <span>{event.date.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                Load More
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="projects">
            <div className="space-y-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-base">Website Redesign</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Status</span>
                      <Badge>In Progress</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Deliverables</span>
                      <span>8 of 10</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Revisions Used</span>
                      <span>3 of 6</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Updated</span>
                      <span>Apr 10, 2025</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2">View Details</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-base">Branding Package</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Status</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Deliverables</span>
                      <span>5 of 5</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Revisions Used</span>
                      <span>4 of 4</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Updated</span>
                      <span>Mar 15, 2025</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
