import { useState } from "react";
import { ChevronDown, ChevronRight, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface MilestoneListProps {
  projectId?: string;
}

const milestones = [
  {
    id: "1",
    title: "Project Discovery",
    status: "completed",
    progress: 100,
    dueDate: new Date("2023-03-10"),
    deliverables: [
      { id: "1-1", title: "Client Questionnaire", status: "completed" },
      { id: "1-2", title: "Initial Research", status: "completed" },
      { id: "1-3", title: "Project Brief", status: "completed" },
    ],
  },
  {
    id: "2",
    title: "Design Phase",
    status: "completed",
    progress: 100,
    dueDate: new Date("2023-03-25"),
    deliverables: [
      { id: "2-1", title: "Wireframes", status: "completed" },
      { id: "2-2", title: "Style Guide", status: "completed" },
      { id: "2-3", title: "Design Mockups", status: "completed" },
    ],
  },
  {
    id: "3",
    title: "Development Phase",
    status: "in-progress",
    progress: 60,
    dueDate: new Date("2023-04-20"),
    deliverables: [
      { id: "3-1", title: "Frontend Structure", status: "completed" },
      { id: "3-2", title: "Backend Integration", status: "in-progress" },
      { id: "3-3", title: "Responsive Testing", status: "pending" },
    ],
  },
  {
    id: "4",
    title: "Quality Assurance",
    status: "pending",
    progress: 0,
    dueDate: new Date("2023-05-05"),
    deliverables: [
      { id: "4-1", title: "Cross-browser Testing", status: "pending" },
      { id: "4-2", title: "Performance Optimization", status: "pending" },
      { id: "4-3", title: "Client Review Session", status: "pending" },
    ],
  },
];

export function MilestoneList({ projectId }: MilestoneListProps) {
  const [expandedMilestones, setExpandedMilestones] = useState<Record<string, boolean>>({
    "1": false,
    "2": false,
    "3": true,
    "4": false,
  });

  const toggleMilestone = (id: string) => {
    setExpandedMilestones((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const statusIcons = {
    "completed": <CheckCircle2 className="h-4 w-4 text-success" />,
    "in-progress": <Clock className="h-4 w-4 text-primary" />,
    "pending": <Clock className="h-4 w-4 text-muted-foreground" />,
    "at-risk": <AlertCircle className="h-4 w-4 text-warning" />,
  };

  const statusLabels = {
    "completed": "Completed",
    "in-progress": "In Progress",
    "pending": "Pending",
    "at-risk": "At Risk",
  };

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => (
        <Card key={milestone.id} className={`overflow-hidden ${milestone.status === 'in-progress' ? 'border-primary/20' : ''}`}>
          <div className={`border-l-4 ${milestone.status === 'completed' ? 'border-l-success' : milestone.status === 'in-progress' ? 'border-l-primary' : milestone.status === 'at-risk' ? 'border-l-warning' : 'border-l-muted'}`}>
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
              onClick={() => toggleMilestone(milestone.id)}
            >
              <div className="flex items-center gap-3">
                {expandedMilestones[milestone.id] ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <h4 className="font-medium">{milestone.title}</h4>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span>Due: {milestone.dueDate.toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{milestone.deliverables.length} deliverables</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:block w-40">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{milestone.progress}%</span>
                  </div>
                  <Progress value={milestone.progress} className="h-1.5" />
                </div>
                <Badge
                  variant="outline"
                  className={`flex items-center gap-1 ${
                    milestone.status === "completed"
                      ? "bg-success/20 text-success"
                      : milestone.status === "in-progress"
                      ? "bg-primary/20 text-primary"
                      : milestone.status === "at-risk"
                      ? "bg-warning/20 text-warning"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {statusIcons[milestone.status as keyof typeof statusIcons]}
                  <span>{statusLabels[milestone.status as keyof typeof statusLabels]}</span>
                </Badge>
              </div>
            </div>
            
            {expandedMilestones[milestone.id] && (
              <CardContent className="pt-0 pb-4 px-4 border-t mt-1">
                <div className="pl-8 space-y-3 mt-2">
                  {milestone.deliverables.map((deliverable) => (
                    <div
                      key={deliverable.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                    >
                      <div className="flex items-center gap-2">
                        {statusIcons[deliverable.status as keyof typeof statusIcons]}
                        <span className="text-sm">{deliverable.title}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${
                          deliverable.status === "completed"
                            ? "bg-success/20 text-success"
                            : deliverable.status === "in-progress"
                            ? "bg-primary/20 text-primary"
                            : deliverable.status === "at-risk"
                            ? "bg-warning/20 text-warning"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {statusLabels[deliverable.status as keyof typeof statusLabels]}
                      </Badge>
                    </div>
                  ))}
                  <div className="flex justify-end mt-2">
                    <Button size="sm" variant="outline">Update Status</Button>
                  </div>
                </div>
              </CardContent>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
