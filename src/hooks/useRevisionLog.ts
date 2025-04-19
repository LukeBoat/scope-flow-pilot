
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Revision {
  id: string;
  deliverableId: string;
  requestedBy: string;
  description: string;
  status: 'pending' | 'completed';
}

export function useRevisionLog() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const logRevision = async (revisionData: Omit<Revision, 'id'>) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('revisions')
        .insert(revisionData)
        .select()
        .single();

      if (error) throw error;

      // Update deliverable metrics
      await supabase.rpc('increment_revision_count', {
        deliverable_id: revisionData.deliverableId
      });

      toast({
        title: "Revision Logged",
        description: "Revision request has been logged successfully."
      });

      return data;
    } catch (error) {
      console.error('Error logging revision:', error);
      toast({
        title: "Error",
        description: "Failed to log revision",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateRevisionStatus = async (id: string, status: 'pending' | 'completed') => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('revisions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

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
      const { data, error } = await supabase
        .from('revisions')
        .select('*')
        .eq('deliverableId', deliverableId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
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
