
import React from "react";
import { AlertCircle, Check, PlusCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface ScopeAlertsProps {
  projectId: string;
  deliverableCount: number;
  deliverableLimit: number;
  revisionsUsed: number;
  revisionsTotal: number;
  onAddAddOn?: () => void;
}

export function ScopeAlerts({
  projectId,
  deliverableCount,
  deliverableLimit,
  revisionsUsed,
  revisionsTotal,
  onAddAddOn,
}: ScopeAlertsProps) {
  const { toast } = useToast();
  const deliverablePercentage = Math.min(Math.round((deliverableCount / deliverableLimit) * 100), 100);
  const revisionsPercentage = Math.min(Math.round((revisionsUsed / revisionsTotal) * 100), 100);
  
  const handleAddOn = (type: "revisions" | "deliverables") => {
    toast({
      title: "Add-on created",
      description: `An add-on for additional ${type} has been created.`,
    });
    if (onAddAddOn) onAddAddOn();
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-semibold">Project Scope</h3>
      
      {/* Deliverables tracker */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span>Deliverables</span>
          <span className="font-medium">
            {deliverableCount} of {deliverableLimit}
          </span>
        </div>
        <Progress value={deliverablePercentage} className="h-2" />
        
        {deliverableCount >= deliverableLimit && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Deliverable limit reached</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>You've reached your deliverable limit.</span>
              <Button 
                size="sm" 
                onClick={() => handleAddOn("deliverables")}
                className="mt-2"
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Add More ($150)
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        {deliverableCount >= deliverableLimit * 0.8 && deliverableCount < deliverableLimit && (
          <Alert className="mt-2 border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertTitle>Approaching deliverable limit</AlertTitle>
            <AlertDescription>
              You're approaching your deliverable limit. Consider an add-on if needed.
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      {/* Revisions tracker */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span>Revisions</span>
          <span className="font-medium">
            {revisionsUsed} of {revisionsTotal}
          </span>
        </div>
        <Progress value={revisionsPercentage} className="h-2" />
        
        {revisionsUsed >= revisionsTotal && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Revision limit reached</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>You've reached your revision limit.</span>
              <Button 
                size="sm" 
                onClick={() => handleAddOn("revisions")}
                className="mt-2"
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Add 3 More ($45)
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        {revisionsUsed >= revisionsTotal * 0.8 && revisionsUsed < revisionsTotal && (
          <Alert className="mt-2 border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertTitle>Approaching revision limit</AlertTitle>
            <AlertDescription>
              You're approaching your revision limit. Consider purchasing additional revisions.
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      <div className="border rounded-lg p-4 bg-muted/20">
        <h4 className="text-sm font-medium mb-2">Add-ons Available</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center justify-between">
            <div className="flex items-center">
              <Check className="h-3.5 w-3.5 mr-2 text-green-500" />
              <span>3 Additional revisions</span>
            </div>
            <Badge variant="outline" className="ml-2">$45</Badge>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center">
              <Check className="h-3.5 w-3.5 mr-2 text-green-500" />
              <span>5 Additional deliverables</span>
            </div>
            <Badge variant="outline" className="ml-2">$150</Badge>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center">
              <Check className="h-3.5 w-3.5 mr-2 text-green-500" />
              <span>Rush delivery (48hr)</span>
            </div>
            <Badge variant="outline" className="ml-2">$99</Badge>
          </li>
        </ul>
      </div>
    </div>
  );
}
