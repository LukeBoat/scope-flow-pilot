
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface Revision {
  id: string;
  deliverableId: string;
  requestedBy: string;
  description: string;
  status: 'pending' | 'completed';
}

// Mock data for revisions
const mockRevisions: Revision[] = [];

export function useRevisionLog() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const logRevision = async (revisionData: Omit<Revision, 'id'>) => {
    try {
      setIsLoading(true);
      
      // Generate a mock ID and create the revision
      const newRevision: Revision = {
        ...revisionData,
        id: `rev-${Date.now()}`
      };
      
      // Add to mock data
      mockRevisions.push(newRevision);
      
      // Simulate network delay and revision count increment
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Revision Logged",
        description: "Revision request has been logged successfully."
      });

      return newRevision;
    } catch (error) {
      console.error('Error logging revision:', error);
      toast({
        title: "Error",
        description: "Failed to log revision",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateRevisionStatus = async (id: string, status: 'pending' | 'completed') => {
    try {
      setIsLoading(true);
      
      // Find and update the revision in our mock data
      const index = mockRevisions.findIndex(rev => rev.id === id);
      if (index !== -1) {
        mockRevisions[index] = { ...mockRevisions[index], status };
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Revision Updated",
        description: "Revision status has been updated successfully."
      });
    } catch (error) {
      console.error('Error updating revision status:', error);
      toast({
        title: "Error",
        description: "Failed to update revision status",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRevisionHistory = async (deliverableId: string) => {
    try {
      setIsLoading(true);
      
      // Filter revisions by deliverableId in our mock data
      const filteredRevisions = mockRevisions.filter(rev => rev.deliverableId === deliverableId);
      
      // Sort by mock created_at (we'll use the id which contains a timestamp)
      const sortedRevisions = [...filteredRevisions].sort((a, b) => 
        parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1])
      );
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return sortedRevisions;
    } catch (error) {
      console.error('Error fetching revision history:', error);
      toast({
        title: "Error",
        description: "Failed to fetch revision history",
        variant: "destructive"
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logRevision,
    updateRevisionStatus,
    getRevisionHistory,
    isLoading
  };
}
