
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { MilestoneList } from "./MilestoneList";
import { RevisionLog } from "./RevisionLog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScopeAlerts } from "./ScopeAlerts";

interface ProjectDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    client: string;
    status: "active" | "paused" | "completed";
    progress: number;
    dueDate: Date;
    revisionsUsed: number;
    revisionsTotal: number;
    description: string;
    team: Array<{
      id: string;
      name: string;
      role: string;
      avatar?: string;
    }>;
    startDate: Date;
  };
}

export const ProjectDrawer = ({
  isOpen,
  onClose,
  project,
}: ProjectDrawerProps) => {
  const [activeTab, setActiveTab] = React.useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-amber-100 text-amber-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[90vh] fixed bottom-0">
        <div className="max-h-[calc(90vh-40px)] overflow-y-auto overscroll-contain pb-8">
          <DrawerHeader className="px-4 sm:px-6">
            <div className="flex justify-between items-center">
              <div>
                <DrawerTitle className="text-2xl">{project.title}</DrawerTitle>
                <DrawerDescription className="mt-1">
                  {project.client}
                </DrawerDescription>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="px-4 sm:px-6"
          >
            <div className="border-b sticky top-0 bg-background z-10 pb-1">
              <TabsList className="justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="milestones">Deliverables</TabsTrigger>
                <TabsTrigger value="revisions">Revisions</TabsTrigger>
                <TabsTrigger value="scope">Scope</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-6 pt-4">
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Progress</h3>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>{project.progress}% Complete</span>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status.charAt(0).toUpperCase() +
                      project.status.slice(1)}
                  </Badge>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium">Description</h3>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Team</h3>
                <div className="flex flex-wrap gap-3">
                  {project.team.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center space-x-2 border rounded-lg px-3 py-1.5 bg-background text-sm"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium leading-none">
                          {member.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Start Date</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(project.startDate)}
                  </p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Due Date</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(project.dueDate)}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="milestones" className="pt-4">
              <MilestoneList projectId={project.id} />
            </TabsContent>

            <TabsContent value="revisions" className="pt-4">
              <RevisionLog
                projectId={project.id}
                revisionsUsed={project.revisionsUsed}
                revisionsTotal={project.revisionsTotal}
              />
            </TabsContent>

            <TabsContent value="scope" className="pt-4">
              <ScopeAlerts
                projectId={project.id}
                deliverableCount={8}
                deliverableLimit={10}
                revisionsUsed={project.revisionsUsed}
                revisionsTotal={project.revisionsTotal}
                onAddAddOn={() => console.log("Add add-on clicked")}
              />
            </TabsContent>
          </Tabs>
        </div>

        <DrawerFooter className="border-t px-4 sm:px-6">
          <div className="flex justify-between gap-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Close
            </Button>
            <Button className="flex-1">View Full Project</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
