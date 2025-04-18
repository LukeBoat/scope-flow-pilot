
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Search, Download, ExternalLink, Receipt } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Invoice {
  id: string;
  number: string;
  amount: number;
  status: string;
  date: string;
  dueDate?: string;
  items?: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
}

interface ClientInvoicesProps {
  invoices: Invoice[];
}

export function ClientInvoices({ invoices }: ClientInvoicesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  
  const filteredInvoices = invoices.filter(invoice => 
    invoice.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setViewDialogOpen(true);
  };

  // Mock invoice items if not provided
  const getInvoiceItems = (invoice: Invoice) => {
    if (invoice.items && invoice.items.length > 0) return invoice.items;
    
    return [
      {
        description: "Website Design Services",
        quantity: 1,
        unitPrice: invoice.amount * 0.7
      },
      {
        description: "Development Services",
        quantity: 1,
        unitPrice: invoice.amount * 0.3
      }
    ];
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          <CardTitle>Invoices</CardTitle>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search invoices..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No invoices found
                </TableCell>
              </TableRow>
            ) : (
              filteredInvoices.map(invoice => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.number}</TableCell>
                  <TableCell className="text-right">${invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewInvoice(invoice)}
                        title="View Invoice"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        title="Download Invoice"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>Invoice {selectedInvoice?.number}</span>
                <Badge className={getStatusColor(selectedInvoice?.status || "")}>
                  {selectedInvoice?.status}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            {selectedInvoice && (
              <div className="space-y-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">Billed To</h3>
                    <p className="text-sm text-muted-foreground">Acme Corporation</p>
                    <p className="text-sm text-muted-foreground">123 Business Street</p>
                    <p className="text-sm text-muted-foreground">contact@acme.com</p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-medium">Invoice Details</h3>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Date: </span>
                      {new Date(selectedInvoice.date).toLocaleDateString()}
                    </p>
                    {selectedInvoice.dueDate && (
                      <p className="text-sm">
                        <span className="text-muted-foreground">Due Date: </span>
                        {new Date(selectedInvoice.dueDate).toLocaleDateString()}
                      </p>
                    )}
                    <p className="text-sm">
                      <span className="text-muted-foreground">Invoice #: </span>
                      {selectedInvoice.number}
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getInvoiceItems(selectedInvoice).map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell className="text-right">${item.unitPrice.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            ${(item.quantity * item.unitPrice).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell className="font-medium text-right">Total</TableCell>
                        <TableCell className="font-bold text-right">${selectedInvoice.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">Payment Methods</h3>
                    <p className="text-sm text-muted-foreground">Bank Transfer or Credit Card</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                    {selectedInvoice.status === "Pending" && (
                      <Button className="gap-2">
                        <CreditCard className="h-4 w-4" />
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
