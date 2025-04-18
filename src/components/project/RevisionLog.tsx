
import React from "react";
import { Progress } from "@/components/ui/progress";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

// Add interface for RevisionLog props
interface RevisionLogProps {
  projectId: string;
  revisionsUsed: number;
  revisionsTotal: number;
}

export function RevisionLog({ projectId, revisionsUsed, revisionsTotal }: RevisionLogProps) {
  const [loading, setLoading] = React.useState(true);
  const [revisions, setRevisions] = React.useState<any[]>([]);

  // Simulate loading revisions data
  React.useEffect(() => {
    const timer = setTimeout(() => {
      // Mock data - in a real app, you would fetch this based on projectId
      setRevisions([
        {
          id: 1,
          date: "2023-03-15",
          deliverable: "Homepage Design",
          requestedBy: "John Client",
          status: "completed",
          notes: "Adjusted the color scheme to be more aligned with brand guidelines."
        },
        {
          id: 2,
          date: "2023-03-20",
          deliverable: "About Page",
          requestedBy: "John Client",
          status: "completed",
          notes: "Revised the team member layout to be more consistent."
        },
        {
          id: 3,
          date: "2023-03-28",
          deliverable: "Product Page",
          requestedBy: "Sarah Manager",
          status: "in-progress",
          notes: "Working on updating the product gallery as requested."
        }
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [projectId]);

  const revisionsPercentage = Math.min(Math.round((revisionsUsed / revisionsTotal) * 100), 100);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span>Revisions Used</span>
          <span className="font-medium">
            {revisionsUsed} of {revisionsTotal}
          </span>
        </div>
        <Progress value={revisionsPercentage} className="h-2" />
        {revisionsUsed >= revisionsTotal && (
          <div className="text-sm text-warning mt-1">
            Revision limit reached. Consider purchasing additional revisions.
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Revision History</h3>
        
        {loading ? (
          <LoadingSkeleton count={3} height="h-24" />
        ) : revisions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border rounded-lg">
            No revisions recorded for this project yet.
          </div>
        ) : (
          <div className="space-y-4">
            {revisions.map((revision) => (
              <div
                key={revision.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{revision.deliverable}</h4>
                    <p className="text-sm text-muted-foreground">
                      Requested by {revision.requestedBy} on {revision.date}
                    </p>
                  </div>
                  <div className={`text-sm px-2 py-1 rounded-full ${
                    revision.status === "completed" 
                      ? "bg-success/20 text-success" 
                      : "bg-primary/20 text-primary"
                  }`}>
                    {revision.status === "completed" ? "Completed" : "In Progress"}
                  </div>
                </div>
                <p className="text-sm">{revision.notes}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
