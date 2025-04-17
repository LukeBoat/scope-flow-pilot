
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  ClipboardList, 
  CreditCard, 
  FileText, 
  FileCheck, 
  X, 
  Pencil, 
  MessageSquare, 
  User,
  Clock,
  ArrowUpRight
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MilestoneList } from "./MilestoneList";
import { RevisionLog } from "./RevisionLog";

interface ProjectDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    client: string;
    description: string;
    status: "active" | "completed" | "paused";
    startDate: Date;
    dueDate: Date;
    team: { id: string; name: string; role: string; avatar?: string }[];
    revisionsUsed: number;
    revisionsTotal: number;
  };
}

export function ProjectDrawer({ isOpen, onClose, project }: ProjectDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-in fade-in">
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-background shadow-xl animate-in slide-in-from-right">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                {project.title}
                <Badge 
                  variant="outline"
                  className={`ml-2 ${
                    project.status === "active" 
                      ? "bg-success/20 text-success" 
                      : project.status === "completed" 
                        ? "bg-muted text-muted-foreground" 
                        : "bg-warning/20 text-warning"
                  }`}
                >
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
              </h2>
              <p className="text-sm text-muted-foreground">{project.client}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="flex flex-col flex-1">
            <div className="border-b">
              <TabsList className="p-1 h-auto bg-transparent border-b-0 mx-4">
                <TabsTrigger value="overview" className="data-[state=active]:bg-muted/50 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-3 py-2">
                  <FileText className="mr-2 h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="deliverables" className="data-[state=active]:bg-muted/50 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-3 py-2">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Deliverables
                </TabsTrigger>
                <TabsTrigger value="revisions" className="data-[state=active]:bg-muted/50 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-3 py-2">
                  <FileCheck className="mr-2 h-4 w-4" />
                  Revisions
                </TabsTrigger>
                <TabsTrigger value="invoices" className="data-[state=active]:bg-muted/50 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-3 py-2">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Invoices
                </TabsTrigger>
              </TabsList>
            </div>
            
            <ScrollArea className="flex-1">
              <TabsContent value="overview" className="mt-0 p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Project Description</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          Timeline
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Start Date:</span>
                          <span>{project.startDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Due Date:</span>
                          <span className="font-medium">{project.dueDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Duration:</span>
                          <span>
                            {Math.ceil((project.dueDate.getTime() - project.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <FileCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                          Revision Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Revisions Used:</span>
                          <span>{project.revisionsUsed}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Revisions Total:</span>
                          <span>{project.revisionsTotal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Remaining:</span>
                          <span className={project.revisionsTotal - project.revisionsUsed <= 2 ? "text-warning font-medium" : ""}>
                            {project.revisionsTotal - project.revisionsUsed}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Team</h3>
                    <div className="space-y-3">
                      {project.team.map((member) => (
                        <div key={member.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{member.name}</p>
                              <p className="text-xs text-muted-foreground">{member.role}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Recent Activity</h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-3">
                          <div className="mt-1">
                            <Avatar className="h-7 w-7">
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">Alex Johnson</p>
                              <span className="text-xs text-muted-foreground">2 hours ago</span>
                            </div>
                            <p className="text-sm">Updated milestone "Final Design Approval" status to completed.</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="deliverables" className="mt-0 p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Project Milestones</h3>
                    <Button size="sm">
                      <Clock className="h-4 w-4 mr-2" />
                      Add Milestone
                    </Button>
                  </div>
                  <MilestoneList />
                </div>
              </TabsContent>
              
              <TabsContent value="revisions" className="mt-0 p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Revision History</h3>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="bg-muted">
                        {project.revisionsUsed}/{project.revisionsTotal} Revisions Used
                      </Badge>
                      <Button size="sm">
                        <ArrowUpRight className="h-4 w-4 mr-2" />
                        Log Revision
                      </Button>
                    </div>
                  </div>
                  <RevisionLog />
                </div>
              </TabsContent>
              
              <TabsContent value="invoices" className="mt-0 p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Invoices</h3>
                    <Button size="sm">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Create Invoice
                    </Button>
                  </div>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <CardTitle className="text-sm font-medium">INV-2023001</CardTitle>
                        </div>
                        <Badge className="bg-success/20 text-success hover:bg-success/30">Paid</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="py-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium">$2,500.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Date:</span>
                        <span>March 15, 2023</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Due Date:</span>
                        <span>March 30, 2023</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <CardTitle className="text-sm font-medium">INV-2023002</CardTitle>
                        </div>
                        <Badge className="bg-warning/20 text-warning hover:bg-warning/30">Pending</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="py-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium">$3,200.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Date:</span>
                        <span>April 10, 2023</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Due Date:</span>
                        <span>April 25, 2023</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </ScrollArea>
            
            <div className="border-t p-4 flex justify-between">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  Client Portal
                </Button>
                <Button>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Project
                </Button>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
