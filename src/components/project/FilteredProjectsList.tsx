
import { useState } from "react";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { ProjectCreateDialog } from "./ProjectCreateDialog";

interface Project {
  id: string;
  name: string;
  client: string;
  status: string;
  progress: number;
  dueDate: string;
  description: string;
  team: Array<{id: string; name: string; role: string}>;
  budget: number;
  deliverables: number;
  completedDeliverables: number;
}

interface FilteredProjectsListProps {
  projects: Project[];
  searchTerm: string;
  statusFilter: string;
}

export const FilteredProjectsList = ({ 
  projects,
  searchTerm,
  statusFilter 
}: FilteredProjectsListProps) => {
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      {filteredProjects.length === 0 ? (
        <div className="md:col-span-2 lg:col-span-3 p-8 text-center">
          <p className="text-muted-foreground">No projects found. Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </>
  );
};
