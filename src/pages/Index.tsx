
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProjectStats } from "@/components/dashboard/ProjectStats";
import { ProjectFilters } from "@/components/dashboard/ProjectFilters";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { ProjectDrawer } from "@/components/project/ProjectDrawer";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Sample project data
  const projects = [
    {
      id: "1",
      title: "E-commerce Website Redesign",
      client: "Global Retail Solutions",
      status: "active" as const,
      progress: 65,
      dueDate: new Date("2023-05-15"),
      revisionsUsed: 2,
      revisionsTotal: 6,
      updatedAt: new Date("2023-03-28"),
      teamSize: 4,
      startDate: new Date("2023-02-15"),
      description: "Complete redesign of the client's e-commerce platform, including improved user experience, mobile responsiveness, and integration with their inventory management system.",
      team: [
        { id: "t1", name: "Alex Johnson", role: "Project Manager", avatar: "https://github.com/shadcn.png" },
        { id: "t2", name: "Sarah Williams", role: "UI/UX Designer" },
        { id: "t3", name: "Michael Brown", role: "Frontend Developer" },
        { id: "t4", name: "Jessica Miller", role: "Backend Developer" },
      ],
    },
    {
      id: "2",
      title: "Mobile App Development",
      client: "HealthTrack Inc.",
      status: "active" as const,
      progress: 40,
      dueDate: new Date("2023-06-30"),
      revisionsUsed: 1,
      revisionsTotal: 8,
      updatedAt: new Date("2023-03-25"),
      teamSize: 5,
      startDate: new Date("2023-03-01"),
      description: "Building a new health tracking mobile application for iOS and Android platforms with features including workout tracking, nutrition planning, and wellness metrics.",
      team: [
        { id: "t5", name: "Alex Johnson", role: "Project Manager", avatar: "https://github.com/shadcn.png" },
        { id: "t6", name: "David Lee", role: "UX Designer" },
        { id: "t7", name: "Emily Clark", role: "Mobile Developer" },
        { id: "t8", name: "Ryan Wilson", role: "Backend Developer" },
        { id: "t9", name: "Sophia Martinez", role: "QA Engineer" },
      ],
    },
    {
      id: "3",
      title: "Corporate Identity Refresh",
      client: "Innovate Finance",
      status: "completed" as const,
      progress: 100,
      dueDate: new Date("2023-03-10"),
      revisionsUsed: 4,
      revisionsTotal: 4,
      updatedAt: new Date("2023-03-10"),
      teamSize: 3,
      startDate: new Date("2023-01-20"),
      description: "Complete refresh of the corporate identity including logo redesign, brand guidelines, business cards, and letterheads.",
      team: [
        { id: "t10", name: "Alex Johnson", role: "Project Manager", avatar: "https://github.com/shadcn.png" },
        { id: "t11", name: "Lisa Thompson", role: "Brand Designer" },
        { id: "t12", name: "Chris Evans", role: "Graphic Designer" },
      ],
    },
    {
      id: "4",
      title: "Marketing Website",
      client: "GreenTech Solutions",
      status: "paused" as const,
      progress: 30,
      dueDate: new Date("2023-05-30"),
      revisionsUsed: 2,
      revisionsTotal: 6,
      updatedAt: new Date("2023-03-15"),
      teamSize: 3,
      startDate: new Date("2023-02-25"),
      description: "Development of a marketing website to showcase the client's sustainable technology products and services, including interactive product demos.",
      team: [
        { id: "t13", name: "Alex Johnson", role: "Project Manager", avatar: "https://github.com/shadcn.png" },
        { id: "t14", name: "James Wilson", role: "Content Strategist" },
        { id: "t15", name: "Olivia Davis", role: "Web Developer" },
      ],
    },
    {
      id: "5",
      title: "Social Media Campaign",
      client: "Urban Apparel",
      status: "active" as const,
      progress: 75,
      dueDate: new Date("2023-04-15"),
      revisionsUsed: 3,
      revisionsTotal: 5,
      updatedAt: new Date("2023-03-27"),
      teamSize: 2,
      startDate: new Date("2023-03-01"),
      description: "Development and execution of a comprehensive social media campaign across Instagram, TikTok, and Facebook to promote the client's new spring collection.",
      team: [
        { id: "t16", name: "Alex Johnson", role: "Project Manager", avatar: "https://github.com/shadcn.png" },
        { id: "t17", name: "Natalie Kim", role: "Social Media Specialist" },
      ],
    },
    {
      id: "6",
      title: "Product Landing Page",
      client: "NextGen Gadgets",
      status: "active" as const,
      progress: 90,
      dueDate: new Date("2023-04-05"),
      revisionsUsed: 1,
      revisionsTotal: 3,
      updatedAt: new Date("2023-03-29"),
      teamSize: 2,
      startDate: new Date("2023-03-10"),
      description: "Design and development of a high-converting landing page for the client's new flagship tech product, including animations and interactive elements.",
      team: [
        { id: "t18", name: "Alex Johnson", role: "Project Manager", avatar: "https://github.com/shadcn.png" },
        { id: "t19", name: "Tyler Roberts", role: "Web Developer" },
      ],
    },
  ];

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      // Search term filter
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort projects
      switch (sortBy) {
        case "newest":
          return b.updatedAt.getTime() - a.updatedAt.getTime();
        case "oldest":
          return a.updatedAt.getTime() - b.updatedAt.getTime();
        case "due-soon":
          return a.dueDate.getTime() - b.dueDate.getTime();
        case "progress":
          return b.progress - a.progress;
        default:
          return 0;
      }
    });

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleCloseDrawer = () => {
    setSelectedProject(null);
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
        
        <ProjectStats />
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Projects</h2>
            <Button variant="ghost" className="text-sm">View All Projects</Button>
          </div>
          
          <ProjectFilters
            onSearch={setSearchTerm}
            onStatusChange={setStatusFilter}
            onSortChange={setSortBy}
          />
          
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects match your search criteria.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  onClick={() => handleProjectClick(project.id)}
                  className="cursor-pointer"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {selectedProjectData && (
        <ProjectDrawer
          isOpen={!!selectedProject}
          onClose={handleCloseDrawer}
          project={selectedProjectData}
        />
      )}
    </MainLayout>
  );
};

export default Index;
