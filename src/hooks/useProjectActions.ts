
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  client: string;
  status: 'active' | 'paused' | 'completed';
  progress: number;
  dueDate: Date;
  description: string;
}

// Mock data for projects
const mockProjects: Project[] = [];

export function useProjectActions() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const createProject = async (projectData: Omit<Project, 'id'>) => {
    try {
      setIsLoading(true);
      
      // Generate a mock ID and create the project
      const newProject: Project = {
        ...projectData,
        id: `project-${Date.now()}`
      };
      
      // Add to mock data
      mockProjects.push(newProject);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Project Created",
        description: "Project has been created successfully."
      });

      return newProject;
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      setIsLoading(true);
      
      // Find and update the project in our mock data
      const index = mockProjects.findIndex(proj => proj.id === id);
      if (index !== -1) {
        mockProjects[index] = { ...mockProjects[index], ...updates };
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Project Updated",
        description: "Project has been updated successfully."
      });
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      setIsLoading(true);
      
      // Remove the project from our mock data
      const index = mockProjects.findIndex(proj => proj.id === id);
      if (index !== -1) {
        mockProjects.splice(index, 1);
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Project Deleted",
        description: "Project has been deleted successfully."
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createProject,
    updateProject,
    deleteProject,
    isLoading
  };
}
