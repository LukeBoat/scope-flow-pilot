
import React, { useState } from "react";
import { CheckCircle2, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useFeedback } from "@/contexts/FeedbackContext";
import { useToast } from "@/hooks/use-toast";

interface ApprovalControlsProps {
  deliverableId: string;
  projectId: string;
  currentStatus: string;
}

export function ApprovalControls({ 
  deliverableId, 
  projectId, 
  currentStatus 
}: ApprovalControlsProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { hasUnresolvedFeedback } = useFeedback();
  const { toast } = useToast();
  
  const isApproved = currentStatus === "Approved";
  const isReadyForApproval = ["Delivered", "In Progress"].includes(currentStatus);
  
  const handleApprove = async () => {
    if (hasUnresolvedFeedback) return;
    
    setIsUpdating(true);
    try {
      // This would be a Firebase call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Deliverable approved",
        description: "The deliverable has been approved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve deliverable",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleReject = async () => {
    setIsUpdating(true);
    try {
      // This would be a Firebase call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Deliverable rejected",
        description: "The deliverable has been rejected",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject deliverable",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        {!isApproved && (
          <Button
            variant="outline"
            className="border-destructive/30 hover:bg-destructive/10 text-destructive hover:text-destructive"
            onClick={handleReject}
            disabled={isUpdating || !isReadyForApproval}
          >
            <X className="h-4 w-4 mr-1" />
            Reject
          </Button>
        )}
        
        <Button
          variant={isApproved ? "outline" : "default"}
          className={isApproved 
            ? "bg-success/20 text-success border-success/30 hover:bg-success/30" 
            : "bg-success hover:bg-success/90"}
          onClick={handleApprove}
          disabled={isUpdating || !isReadyForApproval || hasUnresolvedFeedback || isApproved}
        >
          <CheckCircle2 className="h-4 w-4 mr-1" />
          {isApproved ? "Approved" : "Approve"}
        </Button>
        
        {hasUnresolvedFeedback && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="ml-1">
                <AlertCircle className="h-4 w-4 text-warning" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Resolve all feedback before approving</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
