
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus, Download, Send, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InvoiceForm } from "@/components/billing/InvoiceForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Invoices = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "paid">("all");
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);

  // Mock data for invoices
  const invoices = [
    { id: "INV-001", client: "Acme Inc.", amount: 2500, date: "2025-04-01", status: "Paid" },
    { id: "INV-002", client: "Globex Corp", amount: 3750, date: "2025-04-15", status: "Pending" },
    { id: "INV-003", client: "Initech", amount: 1200, date: "2025-04-30", status: "Overdue" },
  ];

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (activeTab === "all") return true;
    return invoice.status.toLowerCase() === activeTab;
  });

  const handleSendInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice Sent",
      description: `Invoice ${invoiceId} has been sent to the client.`,
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice ${invoiceId} has been downloaded.`,
    });
  };

  const handleCreateInvoice = (data: any) => {
    console.log("Create invoice with data:", data);
    toast({
      title: "Invoice Created",
      description: `New invoice for ${data.client} has been created.`,
    });
    setIsCreatingInvoice(false);
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Dialog open={isCreatingInvoice} onOpenChange={setIsCreatingInvoice}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
            </DialogHeader>
            <InvoiceForm onSubmit={handleCreateInvoice} onCancel={() => setIsCreatingInvoice(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "all" | "pending" | "paid")}>
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-2 border-b">
            <TabsList className="grid grid-cols-3 w-[300px]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value={activeTab} className="m-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[180px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No invoices found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="group">
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell className="text-right">${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleSendInvoice(invoice.id)}
                            title="Send Invoice"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDownloadInvoice(invoice.id)}
                            title="Download Invoice"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            title="View Payment History"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </div>
      </Tabs>
    </MainLayout>
  );
};

export default Invoices;
