
import React, { createContext, useContext, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Invoice {
  id: string;
  number: string;
  clientId: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: Date;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
}

interface InvoiceContextType {
  createInvoice: (data: Omit<Invoice, 'id'>) => Promise<Invoice | null>;
  updateInvoice: (id: string, updates: Partial<Invoice>) => Promise<void>;
  generatePDF: (invoice: Invoice) => Promise<string>;
  isLoading: boolean;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createInvoice = async (invoiceData: Omit<Invoice, 'id'>) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('invoices')
        .insert(invoiceData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Invoice Created",
        description: "Invoice has been created successfully."
      });

      return data;
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast({
        title: "Error",
        description: "Failed to create invoice",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateInvoice = async (id: string, updates: Partial<Invoice>) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('invoices')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Invoice Updated",
        description: "Invoice has been updated successfully."
      });
    } catch (error) {
      console.error('Error updating invoice:', error);
      toast({
        title: "Error",
        description: "Failed to update invoice",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDF = async (invoice: Invoice) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('generate-invoice-pdf', {
        body: { invoice }
      });

      if (error) throw error;
      return data.url;
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive"
      });
      return '';
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    createInvoice,
    updateInvoice,
    generatePDF,
    isLoading
  };

  return (
    <InvoiceContext.Provider value={value}>
      {children}
    </InvoiceContext.Provider>
  );
}

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};
