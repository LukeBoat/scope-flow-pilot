
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

// Mock data store for invoices
const mockInvoices: Invoice[] = [
  {
    id: "inv-001",
    number: "INV-2025-001",
    clientId: "client-001",
    amount: 2500,
    status: "pending",
    dueDate: new Date("2025-05-15"),
    items: [
      { description: "Website Design", quantity: 1, unitPrice: 2500 }
    ]
  }
];

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createInvoice = async (invoiceData: Omit<Invoice, 'id'>) => {
    try {
      setIsLoading(true);
      
      // Generate a mock ID
      const newInvoice: Invoice = {
        ...invoiceData,
        id: `inv-${Date.now()}`
      };
      
      // In a real app, we would insert into Supabase here
      // For now, just add to our mock array and simulate a delay
      mockInvoices.push(newInvoice);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      toast({
        title: "Invoice Created",
        description: "Invoice has been created successfully."
      });

      return newInvoice;
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
      
      // Find and update the invoice in our mock data
      const index = mockInvoices.findIndex(inv => inv.id === id);
      if (index !== -1) {
        mockInvoices[index] = { ...mockInvoices[index], ...updates };
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

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
      
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return a mock URL
      return `https://example.com/invoices/${invoice.id}.pdf`;
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

  const value: InvoiceContextType = {
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
