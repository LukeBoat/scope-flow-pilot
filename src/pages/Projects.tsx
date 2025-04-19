
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Calendar, CheckCircle, Clock, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

// Mock data for projects
const projectsData = [
  { 
    id: "p1", 
    name: "Website Redesign", 
    client: "Acme Inc.", 
    status: "In Progress", 
    progress: 65,
    dueDate: "2025-05-15",
    description: "Complete overhaul of the corporate website with responsive design and improved UX.",
    team: ["Alex", "Jamie", "Taylor"],
    budget: 15000,
    deliverables: 8,
    completedDeliverables: 5
  },
  { 
    id: "p2", 
    name: "Mobile App Development", 
    client: "Globex Corp", 
    status: "Planning", 
    progress: 25,
    dueDate: "2025-06-30",
    description: "iOS and Android application with customer loyalty features and integrated payments.",
    team: ["Jordan", "Casey", "Morgan"],
    budget: 28000,
    deliverables: 12,
    completedDeliverables: 3
  },
  { 
    id: "p3", 
    name: "Branding Package", 
    client: "Initech", 
    status: "Completed", 
    progress: 100,
    dueDate: "2025-03-20",
    description: "Complete brand identity including logo, style guide, and marketing materials.",
    team: ["Riley", "Sam", "Drew"],
    budget: 9500,
    deliverables: 5,
    completedDeliverables: 5
  },
  { 
    id: "p4", 
    name: "Social Media Campaign", 
    client: "Hooli", 
    status: "On Hold", 
    progress: 40,
    dueDate: "2025-05-10",
    description: "Multi-channel campaign across Instagram, Facebook, and LinkedIn with analytics.",
    team: ["Taylor", "Jordan"],
    budget: 7500,
    deliverables: 6,
    completedDeliverables: 2
  },
  { 
    id: "p5", 
    name: "Content Strategy", 
    client: "Massive Dynamic", 
    status: "In Progress", 
    progress: 80,
    dueDate: "2025-04-25",
    description: "Content calendar, SEO strategy, and blog post creation for Q2 2025.",
    team: ["Casey", "Alex", "Sam"],
    budget: 12000,
    deliverables: 10,
    completedDeliverables: 8
  },
];

const Projects = () => {
  const [projects, setProjects] = useState(projectsData);
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    client: "",
    description: "",
    dueDate: ""
  });

  const { toast } = useToast();

  // Function to get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Planning":
        return "bg-purple-100 text-purple-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "On Hold":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to handle project search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    let filtered = projects;
    if (statusFilter !== "all") {
      filtered = filtered.filter(project => project.status === statusFilter);
    }
    
    if (term) {
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(term) || 
        project.client.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredProjects(filtered);
  };

  // Function to handle status filter
  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    
    let filtered = projects;
    if (value !== "all") {
      filtered = filtered.filter(project => project.status === value);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(searchTerm) || 
        project.client.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm)
      );
    }
    
    setFilteredProjects(filtered);
  };

  // Function to handle project creation
  const handleCreateProject = () => {
    if (!newProject.name || !newProject.client || !newProject.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const createdProject = {
        id: `p${projects.length + 1}`,
        name: newProject.name,
        client: newProject.client,
        status: "Planning",
        progress: 0,
        dueDate: newProject.dueDate,
        description: newProject.description,
        team: [],
        budget: 0,
        deliverables: 0,
        completedDeliverables: 0
      };
      
      const updatedProjects = [...projects, createdProject];
      setProjects(updatedProjects);
      setFilteredProjects(updatedProjects);
      
      setNewProject({
        name: "",
        client: "",
        description: "",
        dueDate: ""
      });
      
      setIsLoading(false);
      setIsCreateDialogOpen(false);
      
      toast({
        title: "Project Created",
        description: "Your project has been created successfully."
      });
    }, 1000);
  };

  // Function to handle project deletion
  const handleDeleteProject = (id) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
    setFilteredProjects(updatedProjects);
    
    toast({
      title: "Project Deleted",
      description: "The project has been deleted successfully."
    });
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add a new project to your workspace.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="client" className="text-right text-sm font-medium">
                  Client
                </label>
                <Input
                  id="client"
                  value={newProject.client}
                  onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="dueDate" className="text-right text-sm font-medium">
                  Due Date
                </label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newProject.dueDate}
                  onChange={(e) => setNewProject({...newProject, dueDate: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right text-sm font-medium">
                  Description
                </label>
                <Input
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateProject} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Project"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Select onValueChange={handleStatusFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Planning">Planning</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="On Hold">On Hold</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 p-8 text-center">
            <p className="text-muted-foreground">No projects found. Try adjusting your search criteria.</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden border-t-4" style={{
              borderTopColor: project.status === "Completed" ? "#22c55e" : 
                              project.status === "In Progress" ? "#3b82f6" : 
                              project.status === "Planning" ? "#8b5cf6" : 
                              project.status === "On Hold" ? "#eab308" : "#6b7280"
            }}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <span className="sr-only">Open menu</span>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                          <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Link to={`/projects/${project.id}`} className="flex w-full">View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Project</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProject(project.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="text-sm text-muted-foreground">Client: {project.client}</div>
                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
              </CardHeader>
              <CardContent>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        Due:
                      </span>
                      <span className="font-medium">{new Date(project.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Deliverables:
                      </span>
                      <span>{project.completedDeliverables}/{project.deliverables}</span>
                    </div>
                    {project.team.length > 0 && (
                      <div className="flex justify-between text-sm items-center">
                        <span>Team:</span>
                        <div className="flex -space-x-2">
                          {project.team.map((member, index) => (
                            <div
                              key={index}
                              className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs border-2 border-background"
                              title={member}
                            >
                              {member.charAt(0)}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </MainLayout>
  );
};

export default Projects;
