
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    client: string;
    status: "active" | "completed" | "paused";
    progress: number;
    dueDate: Date;
    revisionsUsed: number;
    revisionsTotal: number;
    updatedAt: Date;
    teamSize: number;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusColors = {
    active: "bg-success/20 text-success hover:bg-success/30",
    completed: "bg-muted text-muted-foreground hover:bg-muted/80",
    paused: "bg-warning/20 text-warning hover:bg-warning/30",
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-sm text-muted-foreground">{project.client}</p>
          </div>
          <Badge 
            variant="outline"
            className={statusColors[project.status]}
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>
                {formatDistanceToNow(project.dueDate, { addSuffix: true })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{project.teamSize}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3 text-xs text-muted-foreground flex justify-between">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>Updated {formatDistanceToNow(project.updatedAt, { addSuffix: true })}</span>
        </div>
        <div>
          Revisions: {project.revisionsUsed}/{project.revisionsTotal}
        </div>
      </CardFooter>
    </Card>
  );
}
