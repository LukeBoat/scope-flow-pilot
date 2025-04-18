
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, CheckCircle2, Clock, AlertCircle, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock data for deliverables
const deliverables = [
  {
    id: "del1",
    name: "Homepage Design",
    dueDate: "2025-04-20",
    status: "Delivered",
    requiresApproval: true,
    hasUnresolvedFeedback: true
  },
  {
    id: "del2",
    name: "About Page Design",
    dueDate: "2025-04-25",
    status: "In Progress",
    requiresApproval: false,
    hasUnresolvedFeedback: false
  },
  {
    id: "del3",
    name: "Contact Form Implementation",
    dueDate: "2025-05-02",
    status: "Not Started",
    requiresApproval: true,
    hasUnresolvedFeedback: false
  },
  {
    id: "del4",
    name: "Mobile Responsiveness",
    dueDate: "2025-05-10",
    status: "Approved",
    requiresApproval: true,
    hasUnresolvedFeedback: false
  }
];

export function ClientDeliverables() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeliverable, setSelectedDeliverable] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  
  const filteredDeliverables = deliverables.filter(deliverable => 
    deliverable.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "Approved":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "Delivered":
        return <Clock className="h-4 w-4 text-amber-600" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "Not Started":
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Delivered":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Not Started":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "";
    }
  };

  const handleViewDeliverable = (deliverable: any) => {
    setSelectedDeliverable(deliverable);
    setViewDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Project Deliverables</CardTitle>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search deliverables..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Deliverable</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDeliverables.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  No deliverables found
                </TableCell>
              </TableRow>
            ) : (
              filteredDeliverables.map(deliverable => (
                <TableRow key={deliverable.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {deliverable.name}
                      {deliverable.hasUnresolvedFeedback && (
                        <Badge variant="outline" className="ml-2 bg-red-100 text-red-800 border-red-200">
                          Feedback Required
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {new Date(deliverable.dueDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Badge variant="outline" className={getStatusColor(deliverable.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(deliverable.status)}
                          {deliverable.status}
                        </div>
                      </Badge>
                      {deliverable.requiresApproval && deliverable.status === "Delivered" && (
                        <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 border-blue-200">
                          Approval Needed
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewDeliverable(deliverable)}
                      className="gap-1"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>
                {selectedDeliverable?.name} 
                <Badge variant="outline" className={`ml-2 ${getStatusColor(selectedDeliverable?.status || "")}`}>
                  {selectedDeliverable?.status}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-muted/10">
                <h3 className="font-medium mb-2">Deliverable Preview</h3>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Preview would be displayed here</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Provide Feedback</h3>
                <textarea 
                  className="w-full min-h-[100px] p-2 border rounded-md" 
                  placeholder="Write your feedback here..."
                />
                <div className="flex justify-end mt-2 space-x-2">
                  <Button variant="secondary">Upload File</Button>
                  <Button>Submit Feedback</Button>
                </div>
              </div>
              {selectedDeliverable?.requiresApproval && selectedDeliverable?.status === "Delivered" && (
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-2">Approval</h3>
                  <div className="flex space-x-2">
                    <Button variant="destructive">Reject</Button>
                    <Button variant="default" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Note: Approving this deliverable signals that you accept the work as completed.
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
