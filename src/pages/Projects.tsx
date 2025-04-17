
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  // Mock data for projects
  const projects = [
    { id: 1, name: "Website Redesign", client: "Acme Inc.", status: "In Progress", dueDate: "2025-05-15" },
    { id: 2, name: "Mobile App Development", client: "Globex Corp", status: "Planning", dueDate: "2025-06-30" },
    { id: 3, name: "Branding Package", client: "Initech", status: "Completed", dueDate: "2025-03-20" },
  ];

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch(status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Planning":
        return "bg-purple-100 text-purple-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle>{project.name}</CardTitle>
                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Client: {project.client}</p>
              <p className="text-sm mt-2">Due: {new Date(project.dueDate).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Projects;
