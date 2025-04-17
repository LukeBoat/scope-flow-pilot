
import React from "react";
import { ClientPortalLayout } from "@/components/layout/ClientPortalLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, MessageSquare, AlertCircle } from "lucide-react";

const ClientDashboard = () => {
  // Demo client data - in a real app this would come from Firebase
  const clientData = {
    name: "Acme Corporation",
    logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=AC&backgroundColor=4f46e5",
    brandColor: "#4f46e5" // Indigo
  };
  
  // Sample project data
  const project = {
    id: "1",
    name: "Website Redesign",
    progress: 65,
    startDate: new Date("2023-02-15"),
    dueDate: new Date("2023-05-15"),
    milestones: [
      { 
        id: "m1", 
        name: "Discovery & Planning", 
        progress: 100,
        deliverables: [
          { id: "d1", name: "Research Report", status: "Approved" },
          { id: "d2", name: "Sitemap", status: "Approved" }
        ]
      },
      { 
        id: "m2", 
        name: "Design", 
        progress: 75,
        deliverables: [
          { id: "d3", name: "Brand Guidelines", status: "Approved" },
          { id: "d4", name: "Homepage Design", status: "Delivered" },
          { id: "d5", name: "Inner Page Designs", status: "In Progress" }
        ]
      },
      { 
        id: "m3", 
        name: "Development", 
        progress: 20,
        deliverables: [
          { id: "d6", name: "Frontend Development", status: "In Progress" },
          { id: "d7", name: "Backend Development", status: "Not Started" }
        ]
      }
    ],
    invoices: [
      { id: "i1", name: "Initial Deposit", amount: 2500, status: "Paid", dueDate: new Date("2023-02-10") },
      { id: "i2", name: "Milestone 1 Payment", amount: 2500, status: "Paid", dueDate: new Date("2023-03-15") },
      { id: "i3", name: "Milestone 2 Payment", amount: 2500, status: "Unpaid", dueDate: new Date("2023-04-15") }
    ],
    pendingFeedback: 1,
    revisionsUsed: 3,
    revisionsTotal: 8
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Approved": return "bg-green-100 text-green-800 border-green-200";
      case "Delivered": return "bg-blue-100 text-blue-800 border-blue-200";
      case "In Progress": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Not Started": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Format date helper
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  // Get all deliverables across milestones
  const allDeliverables = project.milestones.flatMap(m => m.deliverables);
  const deliverableCount = {
    total: allDeliverables.length,
    approved: allDeliverables.filter(d => d.status === "Approved").length,
    delivered: allDeliverables.filter(d => d.status === "Delivered").length,
    inProgress: allDeliverables.filter(d => d.status === "In Progress").length,
    notStarted: allDeliverables.filter(d => d.status === "Not Started").length
  };

  return (
    <ClientPortalLayout clientData={clientData}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <p className="text-muted-foreground">
              {formatDate(project.startDate)} - {formatDate(project.dueDate)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-1">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {project.revisionsUsed}/{project.revisionsTotal} Revisions Used
            </Badge>
            {project.pendingFeedback > 0 && (
              <Badge variant="secondary" className="px-3 py-1">
                <MessageSquare className="w-3.5 h-3.5 mr-1" />
                {project.pendingFeedback} Pending Feedback
              </Badge>
            )}
          </div>
        </div>

        {/* Project Progress Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>Overall completion and milestone status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex justify-between items-center">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2 mb-6" />

            <div className="space-y-6">
              {project.milestones.map((milestone) => (
                <div key={milestone.id}>
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm font-medium">{milestone.name}</span>
                    <span className="text-sm font-medium">{milestone.progress}%</span>
                  </div>
                  <Progress value={milestone.progress} className="h-1.5 mb-2" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {milestone.deliverables.map((deliverable) => (
                      <div key={deliverable.id} className="flex items-center text-sm">
                        <Badge variant="outline" className={`mr-2 ${getStatusColor(deliverable.status)}`}>
                          {deliverable.status}
                        </Badge>
                        {deliverable.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                Approved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{deliverableCount.approved}</div>
              <p className="text-muted-foreground text-sm">of {deliverableCount.total} deliverables</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
                Awaiting Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{deliverableCount.delivered}</div>
              <p className="text-muted-foreground text-sm">deliverables ready for review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="h-5 w-5 mr-2 text-amber-500" />
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{deliverableCount.inProgress}</div>
              <p className="text-muted-foreground text-sm">deliverables in development</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{deliverableCount.notStarted}</div>
              <p className="text-muted-foreground text-sm">deliverables not yet started</p>
            </CardContent>
          </Card>
        </div>

        {/* Billing Summary */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Billing Summary</CardTitle>
            <CardDescription>Invoice status and payment history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.invoices.map((invoice) => (
                <div key={invoice.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{invoice.name}</p>
                    <p className="text-sm text-muted-foreground">Due {formatDate(invoice.dueDate)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-medium">${invoice.amount.toLocaleString()}</p>
                    <Badge variant={invoice.status === "Paid" ? "outline" : "secondary"}>
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientPortalLayout>
  );
};

export default ClientDashboard;
