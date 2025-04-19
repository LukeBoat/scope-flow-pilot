import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { ProjectFilters } from "@/components/project/ProjectFilters";
import { FilteredProjectsList } from "@/components/project/FilteredProjectsList";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <MainLayout>
      <div className="space-y-6">
        <ProjectHeader />
        <ProjectFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
        <FilteredProjectsList
          projects={projectsData}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        />
      </div>
    </MainLayout>
  );
};

export default Projects;
