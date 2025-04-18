
import React from "react";
import { CalendarIcon } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FeedbackProvider } from "@/contexts/FeedbackContext";
import { FeedbackThread } from "@/components/feedback/FeedbackThread";
import { ApprovalControls } from "@/components/feedback/ApprovalControls";
import { FileAttachment } from "@/components/feedback/FileAttachment";

interface DeliverableViewProps {
  deliverable: {
    id: string;
    name: string;
    status: "Not Started" | "In Progress" | "Delivered" | "Approved";
    notes: string;
    dueDate: Date;
    fileUrl?: string;
  };
  projectId: string;
  isAdmin?: boolean;
}

export function DeliverableView({ 
  deliverable, 
  projectId, 
  isAdmin = true 
}: DeliverableViewProps) {
  const statusVariantMap = {
    "Not Started": "outline",
    "In Progress": "default",
    "Delivered": "secondary",
    "Approved": "success"
  } as const;
  
  const statusColorMap = {
    "Not Started": "bg-muted text-muted-foreground",
    "In Progress": "bg-primary/20 text-primary",
    "Delivered": "bg-secondary/20 text-secondary-foreground",
    "Approved": "bg-success/20 text-success"
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <Card className="border rounded-lg overflow-hidden animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
        <div className="space-y-1">
          <CardTitle className="text-xl">{deliverable.name}</CardTitle>
          <CardDescription className="flex items-center">
            <CalendarIcon className="mr-1 h-3 w-3" />
            Due: {formatDate(deliverable.dueDate)}
          </CardDescription>
        </div>
        <Badge 
          variant="outline"
          className={statusColorMap[deliverable.status]}
        >
          {deliverable.status}
        </Badge>
      </CardHeader>
      
      {deliverable.fileUrl && (
        <div className="p-4 border-b bg-muted/20">
          <FileAttachment url={deliverable.fileUrl} showPreview={true} />
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Notes</h3>
          <p className="text-sm text-muted-foreground">{deliverable.notes || "No additional notes."}</p>
        </div>
        
        <Separator className="my-6" />
        
        <FeedbackProvider projectId={projectId} deliverableId={deliverable.id}>
          <FeedbackThread projectId={projectId} deliverableId={deliverable.id} />
        </FeedbackProvider>
      </CardContent>
      
      {isAdmin && (
        <CardFooter className="flex justify-end border-t p-4 bg-muted/10">
          <ApprovalControls 
            deliverableId={deliverable.id} 
            projectId={projectId}
            currentStatus={deliverable.status}
          />
        </CardFooter>
      )}
    </Card>
  );
}
