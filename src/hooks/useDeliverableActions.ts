
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Deliverable {
  id: string;
  name: string;
  projectId: string;
  status: 'Not Started' | 'In Progress' | 'Delivered' | 'Approved';
  dueDate: Date;
}

export function useDeliverableActions() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createDeliverable = async (deliverableData: Omit<Deliverable, 'id'>) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('deliverables')
        .insert(deliverableData)
        .select()
        .single();

      if (error) throw error;

      await supabase.from('deliverable_metrics').insert({
        deliverable_id: data.id,
        project_id: deliverableData.projectId,
      });

      toast({
        title: "Deliverable Created",
        description: "Deliverable has been created successfully."
      });

      return data;
    } catch (error) {
      console.error('Error creating deliverable:', error);
      toast({
        title: "Error",
        description: "Failed to create deliverable",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateDeliverable = async (id: string, updates: Partial<Deliverable>) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('deliverables')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

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
      const { error } = await supabase
        .from('deliverables')
        .delete()
        .eq('id', id);

      if (error) throw error;

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
