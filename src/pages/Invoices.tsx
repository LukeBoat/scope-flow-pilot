
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus, Download, Send, ExternalLink, FileText, Search, Calendar, Filter, CreditCard, Printer, FileUp, Archive } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InvoiceForm } from "@/components/billing/InvoiceForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

const Invoices = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "paid" | "overdue">("all");
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isViewingInvoice, setIsViewingInvoice] = useState(false);
  const [timeframe, setTimeframe] = useState("quarter");

  // Mock data for invoices
  const [invoices, setInvoices] = useState([
    { 
      id: "INV-001", 
      client: "Acme Inc.", 
      clientId: "c1",
      project: "Website Redesign",
      projectId: "p1",
      amount: 2500, 
      date: "2025-04-01", 
      dueDate: "2025-04-15",
      status: "Paid",
      paymentMethod: "Credit Card",
      items: [
        { description: "Website Design", quantity: 1, unitPrice: 1500 },
        { description: "SEO Setup", quantity: 1, unitPrice: 1000 }
      ],
      notes: "Payment received on time"
    },
    { 
      id: "INV-002", 
      client: "Globex Corp", 
      clientId: "c2",
      project: "Mobile App Development",
      projectId: "p2",
      amount: 3750, 
      date: "2025-04-15", 
      dueDate: "2025-04-29", 
      status: "Pending",
      paymentMethod: null,
      items: [
        { description: "UI Design", quantity: 1, unitPrice: 1750 },
        { description: "Frontend Development", quantity: 1, unitPrice: 2000 }
      ],
      notes: "First milestone payment"
    },
    { 
      id: "INV-003", 
      client: "Initech", 
      clientId: "c3",
      project: "Branding Package",
      projectId: "p3",
      amount: 1200, 
      date: "2025-03-30", 
      dueDate: "2025-04-13", 
      status: "Overdue",
      paymentMethod: null,
      items: [
        { description: "Logo Design", quantity: 1, unitPrice: 500 },
        { description: "Brand Guidelines", quantity: 1, unitPrice: 700 }
      ],
      notes: "Second reminder sent"
    },
    { 
      id: "INV-004", 
      client: "Wayne Enterprises", 
      clientId: "c4",
      project: "Security Consulting",
      projectId: "p4",
      amount: 5200, 
      date: "2025-04-02", 
      dueDate: "2025-04-16", 
      status: "Paid",
      paymentMethod: "Bank Transfer",
      items: [
        { description: "Security Audit", quantity: 1, unitPrice: 3200 },
        { description: "Implementation Support", quantity: 1, unitPrice: 2000 }
      ],
      notes: ""
    },
    { 
      id: "INV-005", 
      client: "Stark Industries", 
      clientId: "c5",
      project: "R&D Consultation",
      projectId: "p5",
      amount: 8750, 
      date: "2025-04-10", 
      dueDate: "2025-04-24", 
      status: "Pending",
      paymentMethod: null,
      items: [
        { description: "Technical Consulting (40 hrs)", quantity: 40, unitPrice: 175 },
        { description: "Prototype Development", quantity: 1, unitPrice: 1750 }
      ],
      notes: "Awaiting approval from client"
    },
    { 
      id: "INV-006", 
      client: "Acme Inc.", 
      clientId: "c1",
      project: "Marketing Campaign",
      projectId: "p6",
      amount: 3200, 
      date: "2025-03-25", 
      dueDate: "2025-04-08", 
      status: "Overdue",
      paymentMethod: null,
      items: [
        { description: "Social Media Campaign", quantity: 1, unitPrice: 1800 },
        { description: "Content Creation", quantity: 1, unitPrice: 1400 }
      ],
      notes: "Follow-up call scheduled for next week"
    }
  ]);

  // Invoice stats calculation
  const invoiceStats = {
    total: invoices.length,
    pending: invoices.filter(inv => inv.status === "Pending").length,
    paid: invoices.filter(inv => inv.status === "Paid").length,
    overdue: invoices.filter(inv => inv.status === "Overdue").length,
    totalRevenue: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paidRevenue: invoices.filter(inv => inv.status === "Paid").reduce((sum, inv) => sum + inv.amount, 0),
    pendingRevenue: invoices.filter(inv => inv.status === "Pending").reduce((sum, inv) => sum + inv.amount, 0),
    overdueRevenue: invoices.filter(inv => inv.status === "Overdue").reduce((sum, inv) => sum + inv.amount, 0)
  };

  // Function to filter and sort invoices
  const getFilteredInvoices = () => {
    let filtered = [...invoices];
    
    // Apply status filter
    if (activeTab !== "all") {
      filtered = filtered.filter(invoice => invoice.status.toLowerCase() === activeTab);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(invoice => 
        invoice.id.toLowerCase().includes(term) || 
        invoice.client.toLowerCase().includes(term) ||
        invoice.project.toLowerCase().includes(term)
      );
    }
    
    // Apply date filter
    if (dateFilter !== "all") {
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);
      const ninetyDaysAgo = new Date(today);
      ninetyDaysAgo.setDate(today.getDate() - 90);
      
      if (dateFilter === "30days") {
        filtered = filtered.filter(invoice => new Date(invoice.date) >= thirtyDaysAgo);
      } else if (dateFilter === "90days") {
        filtered = filtered.filter(invoice => new Date(invoice.date) >= ninetyDaysAgo);
      }
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "amount-desc":
          return b.amount - a.amount;
        case "amount-asc":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });
    
    return filtered;
  };

  // Function to get status badge color
  const getStatusColor = (status) => {
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

  const handleSendInvoice = (invoiceId) => {
    toast({
      title: "Invoice Sent",
      description: `Invoice ${invoiceId} has been sent to the client.`,
    });
  };

  const handleDownloadInvoice = (invoiceId) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice ${invoiceId} has been downloaded.`,
    });
  };

  const handleCreateInvoice = (data) => {
    const newInvoice = {
      id: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
      client: data.client,
      clientId: data.clientId,
      project: data.project,
      projectId: data.projectId,
      amount: data.amount,
      date: new Date().toISOString().split('T')[0],
      dueDate: data.dueDate,
      status: "Pending",
      paymentMethod: null,
      items: data.items || [],
      notes: data.notes || ""
    };
    
    setInvoices([...invoices, newInvoice]);
    
    toast({
      title: "Invoice Created",
      description: `Invoice ${newInvoice.id} for ${data.client} has been created.`,
    });
    
    setIsCreatingInvoice(false);
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsViewingInvoice(true);
  };

  const handleMarkAsPaid = (invoiceId) => {
    const updatedInvoices = invoices.map(invoice => {
      if (invoice.id === invoiceId) {
        return {
          ...invoice,
          status: "Paid",
          paymentMethod: "Manual Entry",
        };
      }
      return invoice;
    });
    
    setInvoices(updatedInvoices);
    
    toast({
      title: "Invoice Updated",
      description: `Invoice ${invoiceId} has been marked as paid.`,
    });
    
    if (isViewingInvoice && selectedInvoice?.id === invoiceId) {
      setSelectedInvoice({...selectedInvoice, status: "Paid", paymentMethod: "Manual Entry"});
    }
  };

  // Get filtered invoices based on current filters
  const filteredInvoices = getFilteredInvoices();

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Invoices</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track all client invoices
          </p>
        </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoiceStats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              ${invoiceStats.totalRevenue.toLocaleString()} total value
            </p>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{invoiceStats.paid}</div>
            <p className="text-xs text-green-600/80 mt-1">
              ${invoiceStats.paidRevenue.toLocaleString()} received
            </p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">{invoiceStats.pending}</div>
            <p className="text-xs text-yellow-600/80 mt-1">
              ${invoiceStats.pendingRevenue.toLocaleString()} awaiting payment
            </p>
          </CardContent>
        </Card>
        <Card className="bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{invoiceStats.overdue}</div>
            <p className="text-xs text-red-600/80 mt-1">
              ${invoiceStats.overdueRevenue.toLocaleString()} overdue
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6 items-start md:items-center">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[110px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Newest First</SelectItem>
              <SelectItem value="date-asc">Oldest First</SelectItem>
              <SelectItem value="amount-desc">Highest Amount</SelectItem>
              <SelectItem value="amount-asc">Lowest Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "all" | "pending" | "paid" | "overdue")}>
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-2 border-b">
            <TabsList className="grid grid-cols-4 w-full max-w-[450px]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value={activeTab} className="m-0">
            {filteredInvoices.length === 0 ? (
              <div className="text-center py-10">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-medium text-lg mb-1">No invoices found</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  No invoices match your current filters. Try adjusting your search criteria or create a new invoice.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => setIsCreatingInvoice(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Invoice
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[180px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="group">
                      <TableCell className="font-medium cursor-pointer" onClick={() => handleViewInvoice(invoice)}>
                        {invoice.id}
                      </TableCell>
                      <TableCell>
                        <Link to={`/clients/${invoice.clientId}`} className="hover:underline">
                          {invoice.client}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/projects/${invoice.projectId}`} className="hover:underline">
                          {invoice.project}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right">${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewInvoice(invoice)}>View Details</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownloadInvoice(invoice.id)}>
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendInvoice(invoice.id)}>
                                <Send className="h-4 w-4 mr-2" />
                                Send to Client
                              </DropdownMenuItem>
                              {invoice.status !== "Paid" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleMarkAsPaid(invoice.id)}>
                                    <CreditCard className="h-4 w-4 mr-2" />
                                    Mark as Paid
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </div>
      </Tabs>

      {/* Invoice Details Dialog */}
      <Dialog open={isViewingInvoice} onOpenChange={setIsViewingInvoice}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>Invoice {selectedInvoice?.id}</DialogTitle>
              <Badge className={selectedInvoice ? getStatusColor(selectedInvoice.status) : ""}>
                {selectedInvoice?.status}
              </Badge>
            </div>
          </DialogHeader>
          
          {selectedInvoice && (
            <div className="space-y-6">
              {/* Header information */}
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">Billed To</h3>
                  <p className="text-sm">{selectedInvoice.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Invoice Date: </span>
                    {new Date(selectedInvoice.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Due Date: </span>
                    {new Date(selectedInvoice.dueDate).toLocaleDateString()}
                  </p>
                  {selectedInvoice.status === "Paid" && (
                    <p className="text-sm">
                      <span className="text-muted-foreground">Payment Method: </span>
                      {selectedInvoice.paymentMethod}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Invoice items */}
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedInvoice.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">${item.unitPrice.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          ${(item.quantity * item.unitPrice).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2}></TableCell>
                      <TableCell className="text-right font-medium">Total</TableCell>
                      <TableCell className="text-right font-bold">
                        ${selectedInvoice.amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              {/* Notes and extra information */}
              {selectedInvoice.notes && (
                <div>
                  <h4 className="font-medium text-sm">Notes</h4>
                  <p className="text-sm text-muted-foreground">{selectedInvoice.notes}</p>
                </div>
              )}
              
              {/* Action buttons */}
              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => setIsViewingInvoice(false)}>
                  Close
                </Button>
                
                <div className="flex gap-2">
                  {selectedInvoice.status !== "Paid" && (
                    <Button size="sm" onClick={() => handleMarkAsPaid(selectedInvoice.id)}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Mark as Paid
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        More Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDownloadInvoice(selectedInvoice.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSendInvoice(selectedInvoice.id)}>
                        <Send className="h-4 w-4 mr-2" />
                        Send to Client
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Printer className="h-4 w-4 mr-2" />
                        Print Invoice
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <FileUp className="h-4 w-4 mr-2" />
                        Upload Receipt
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="h-4 w-4 mr-2" />
                        Archive Invoice
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Invoices;
