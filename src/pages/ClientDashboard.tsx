
import React, { useState } from "react";
import { ClientPortalLayout } from "@/components/layout/ClientPortalLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  MessageSquare, 
  Clock, 
  CreditCard, 
  CheckCircle2, 
  Download, 
  Calendar,
  CheckSquare
} from "lucide-react";
import { Analytics } from "@/components/dashboard/Analytics";
import { MessageThread } from "@/components/messaging/MessageThread";
import { ClientDeliverables } from "@/components/client/ClientDeliverables";
import { ClientInvoices } from "@/components/client/ClientInvoices";
import { ClientFeedback } from "@/components/client/ClientFeedback";

const ClientDashboard = () => {
  // Sample client data - in a real app, this would come from authentication and database
  const clientData = {
    name: "Acme Corporation",
    logoUrl: "https://via.placeholder.com/150",
    brandColor: "#4F46E5"
  };

  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for projects
  const projects = [
    {
      id: "project1",
      name: "Website Redesign",
      progress: 65,
      dueDate: "May 15, 2025",
      status: "In Progress",
      deliverables: {
        total: 12,
        completed: 8,
        pending: 2,
        awaiting: 2
      }
    }
  ];

  // Mock data for invoices
  const invoices = [
    {
      id: "inv1",
      number: "INV-2025-001",
      amount: 2500,
      status: "Paid",
      date: "Jan 15, 2025"
    },
    {
      id: "inv2",
      number: "INV-2025-002",
      amount: 1500,
      status: "Pending",
      date: "April 1, 2025",
      dueDate: "April 15, 2025"
    }
  ];

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case "paid":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-amber-600 bg-amber-100";
      case "overdue":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <ClientPortalLayout clientData={clientData}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deliverables">
            <CheckSquare className="h-4 w-4 mr-2" />
            Deliverables
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <MessageSquare className="h-4 w-4 mr-2" />
            Feedback
          </TabsTrigger>
          <TabsTrigger value="invoices">
            <CreditCard className="h-4 w-4 mr-2" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="history">
            <Calendar className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {projects.map(project => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{project.name}</CardTitle>
                  <span className="text-sm text-muted-foreground">Due: {project.dueDate}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Project Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-muted rounded-lg p-3 flex gap-3 items-center">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Total Deliverables</p>
                      <p className="text-2xl font-bold">{project.deliverables.total}</p>
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 flex gap-3 items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Completed</p>
                      <p className="text-2xl font-bold">{project.deliverables.completed}</p>
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 flex gap-3 items-center">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Awaiting Feedback</p>
                      <p className="text-2xl font-bold">{project.deliverables.awaiting}</p>
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 flex gap-3 items-center">
                    <Clock className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium">Pending</p>
                      <p className="text-2xl font-bold">{project.deliverables.pending}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map(invoice => (
                  <div key={invoice.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{invoice.number}</p>
                        <p className="text-sm text-muted-foreground">{invoice.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">${invoice.amount}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" className="gap-2">
                  <CreditCard className="h-4 w-4" />
                  View All Invoices
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start gap-2">
                  <FileText className="h-4 w-4" />
                  Export Project Summary
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Export Feedback as PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deliverables Tab */}
        <TabsContent value="deliverables">
          <ClientDeliverables />
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback">
          <ClientFeedback />
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices">
          <ClientInvoices invoices={invoices} />
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>Project History</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <MessageThread 
                deliverableId="sample-deliverable" 
                projectId="sample-project"
                initialMessages={[
                  {
                    id: "1",
                    content: "Hi there! Could you please review the latest homepage design I've shared?",
                    sender: {
                      id: "admin1",
                      name: "Alex (Project Manager)",
                      role: "admin",
                      avatar: "https://github.com/shadcn.png"
                    },
                    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
                  },
                  {
                    id: "2",
                    content: "I've taken a look and really like the direction. Could we make the call-to-action button more prominent?",
                    sender: {
                      id: "client1",
                      name: "John (Client)",
                      role: "client"
                    },
                    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12) // 12 hours ago
                  }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ClientPortalLayout>
  );
};

export default ClientDashboard;
