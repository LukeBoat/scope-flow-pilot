
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface Deliverable {
  id: string;
  name: string;
  projectId: string;
  status: 'Not Started' | 'In Progress' | 'Delivered' | 'Approved';
  dueDate: Date;
}

// Mock data for deliverables
const mockDeliverables: Deliverable[] = [];

export function useDeliverableActions() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createDeliverable = async (deliverableData: Omit<Deliverable, 'id'>) => {
    try {
      setIsLoading(true);
      
      // Generate a mock ID and create the deliverable
      const newDeliverable: Deliverable = {
        ...deliverableData,
        id: `del-${Date.now()}`
      };
      
      // Add to mock data
      mockDeliverables.push(newDeliverable);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Deliverable Created",
        description: "Deliverable has been created successfully."
      });

      return newDeliverable;
    } catch (error) {
      console.error('Error creating deliverable:', error);
      toast({
        title: "Error",
        description: "Failed to create deliverable",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateDeliverable = async (id: string, updates: Partial<Deliverable>) => {
    try {
      setIsLoading(true);
      
      // Find and update the deliverable in our mock data
      const index = mockDeliverables.findIndex(del => del.id === id);
      if (index !== -1) {
        mockDeliverables[index] = { ...mockDeliverables[index], ...updates };
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Deliverable Updated",
        description: "Deliverable has been updated successfully."
      });
    } catch (error) {
      console.error('Error updating deliverable:', error);
      toast({
        title: "Error",
        description: "Failed to update deliverable",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDeliverable = async (id: string) => {
    try {
      setIsLoading(true);
      
      // Remove the deliverable from our mock data
      const index = mockDeliverables.findIndex(del => del.id === id);
      if (index !== -1) {
        mockDeliverables.splice(index, 1);
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Deliverable Deleted",
        description: "Deliverable has been deleted successfully."
      });
    } catch (error) {
      console.error('Error deleting deliverable:', error);
      toast({
        title: "Error",
        description: "Failed to delete deliverable",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createDeliverable,
    updateDeliverable,
    deleteDeliverable,
    isLoading
  };
}
