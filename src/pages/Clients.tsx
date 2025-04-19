
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Mail, Phone, Building, MoreHorizontal, Loader2, User, Calendar, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const Clients = () => {
  // Mock data for clients
  const [clients, setClients] = useState([
    { 
      id: "c1", 
      name: "Acme Inc.", 
      contact: "John Smith", 
      email: "john@acmeinc.com", 
      phone: "+1 (555) 123-4567",
      address: "123 Business Ave, Suite 100, San Francisco, CA 94107",
      projects: 3, 
      status: "Active", 
      joinedDate: "2024-09-15",
      totalRevenue: 24500,
      notes: "Large enterprise client with multiple ongoing projects."
    },
    { 
      id: "c2", 
      name: "Globex Corp", 
      contact: "Jane Doe", 
      email: "jane@globex.com", 
      phone: "+1 (555) 987-6543",
      address: "456 Corporate Blvd, New York, NY 10001",
      projects: 2, 
      status: "Active", 
      joinedDate: "2024-10-05",
      totalRevenue: 18750,
      notes: "Mid-size client focused on digital transformation initiatives."
    },
    { 
      id: "c3", 
      name: "Initech", 
      contact: "Michael Bolton", 
      email: "michael@initech.com", 
      phone: "+1 (555) 555-5555",
      address: "789 Tech Park, Austin, TX 78701",
      projects: 1, 
      status: "Inactive", 
      joinedDate: "2024-05-20",
      totalRevenue: 7200,
      notes: "Previous client with completed project. Potential for new projects in Q3."
    },
    { 
      id: "c4", 
      name: "Wayne Enterprises", 
      contact: "Bruce Wayne", 
      email: "bruce@wayne.com", 
      phone: "+1 (555) 228-6261",
      address: "1 Wayne Tower, Gotham City, NJ 08701",
      projects: 4, 
      status: "Active", 
      joinedDate: "2024-02-18",
      totalRevenue: 42000,
      notes: "VIP client with substantial budget for multiple projects."
    },
    { 
      id: "c5", 
      name: "Stark Industries", 
      contact: "Pepper Potts", 
      email: "pepper@stark.com", 
      phone: "+1 (555) 468-3792",
      address: "200 Park Avenue, New York, NY 10166",
      projects: 2, 
      status: "Active", 
      joinedDate: "2024-07-29",
      totalRevenue: 31500,
      notes: "Innovative tech company with focus on cutting-edge projects."
    },
  ]);
  
  const [filteredClients, setFilteredClients] = useState(clients);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isClientDetailsOpen, setIsClientDetailsOpen] = useState(false);
  const [isCreateClientOpen, setIsCreateClientOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  const [newClient, setNewClient] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    notes: ""
  });
  
  const { toast } = useToast();

  // Filter clients based on search and status
  const filterClients = (term = searchTerm, tab = activeTab) => {
    let filtered = clients;
    
    if (tab !== "all") {
      const status = tab === "active" ? "Active" : "Inactive";
      filtered = filtered.filter(client => client.status === status);
    }
    
    if (term) {
      const lowercaseTerm = term.toLowerCase();
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(lowercaseTerm) ||
        client.contact.toLowerCase().includes(lowercaseTerm) ||
        client.email.toLowerCase().includes(lowercaseTerm)
      );
    }
    
    setFilteredClients(filtered);
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterClients(term);
  };

  // Handle tab change
  const handleTabChange = (value) => {
    setActiveTab(value);
    filterClients(searchTerm, value);
  };

  // Handle viewing client details
  const handleViewClient = (client) => {
    setSelectedClient(client);
    setIsClientDetailsOpen(true);
  };

  // Handle creating new client
  const handleCreateClient = () => {
    // Validate required fields
    if (!newClient.name || !newClient.email) {
      toast({
        title: "Missing Information",
        description: "Client name and email are required.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const createdClient = {
        id: `c${clients.length + 1}`,
        name: newClient.name,
        contact: newClient.contact,
        email: newClient.email,
        phone: newClient.phone,
        address: newClient.address,
        projects: 0,
        status: "Active",
        joinedDate: new Date().toISOString().split("T")[0],
        totalRevenue: 0,
        notes: newClient.notes
      };
      
      const updatedClients = [...clients, createdClient];
      setClients(updatedClients);
      filterClients(searchTerm, activeTab);
      
      setNewClient({
        name: "",
        contact: "",
        email: "",
        phone: "",
        address: "",
        notes: ""
      });
      
      setIsLoading(false);
      setIsCreateClientOpen(false);
      
      toast({
        title: "Client Created",
        description: "New client has been added successfully.",
      });
    }, 1000);
  };

  // Handle delete client
  const handleDeleteClient = (id) => {
    const updatedClients = clients.filter(client => client.id !== id);
    setClients(updatedClients);
    filterClients();
    
    if (isClientDetailsOpen && selectedClient?.id === id) {
      setIsClientDetailsOpen(false);
    }
    
    toast({
      title: "Client Deleted",
      description: "The client has been removed successfully.",
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-sm text-muted-foreground">
            Manage your client relationships and projects
          </p>
        </div>
        <Dialog open={isCreateClientOpen} onOpenChange={setIsCreateClientOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Enter client details to create a new client profile.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm font-medium">
                  Company Name *
                </label>
                <Input
                  id="name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="contact" className="text-right text-sm font-medium">
                  Contact Person
                </label>
                <Input
                  id="contact"
                  value={newClient.contact}
                  onChange={(e) => setNewClient({...newClient, contact: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right text-sm font-medium">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="phone" className="text-right text-sm font-medium">
                  Phone
                </label>
                <Input
                  id="phone"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="address" className="text-right text-sm font-medium">
                  Address
                </label>
                <Input
                  id="address"
                  value={newClient.address}
                  onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="notes" className="text-right text-sm font-medium">
                  Notes
                </label>
                <Input
                  id="notes"
                  value={newClient.notes}
                  onChange={(e) => setNewClient({...newClient, notes: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateClientOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateClient} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Client"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full md:w-auto">
          <TabsList className="grid w-full md:w-[300px] grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Client grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 p-8 text-center">
            <p className="text-muted-foreground">No clients found matching your search criteria.</p>
          </div>
        ) : (
          filteredClients.map((client) => (
            <Card key={client.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>{client.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleViewClient(client)}>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Client</DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to={`/clients/${client.id}/history`} className="flex w-full">View History</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClient(client.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <span className="text-sm flex-1">{client.contact}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <a href={`mailto:${client.email}`} className="text-sm flex-1 hover:underline">
                      {client.email}
                    </a>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <a href={`tel:${client.phone}`} className="text-sm flex-1 hover:underline">
                      {client.phone}
                    </a>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Badge variant={client.status === "Active" ? "default" : "secondary"}>
                    {client.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {client.projects} {client.projects === 1 ? "Project" : "Projects"}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewClient(client)}
                >
                  Details
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Client Details Dialog */}
      <Dialog open={isClientDetailsOpen} onOpenChange={setIsClientDetailsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedClient?.name}</DialogTitle>
            <div className="flex items-center space-x-2">
              <Badge variant={selectedClient?.status === "Active" ? "default" : "secondary"}>
                {selectedClient?.status}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Client since {selectedClient?.joinedDate && new Date(selectedClient.joinedDate).toLocaleDateString()}
              </span>
            </div>
          </DialogHeader>
          
          {selectedClient && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <span className="text-sm">{selectedClient.contact}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <a href={`mailto:${selectedClient.email}`} className="text-sm hover:underline">
                          {selectedClient.email}
                        </a>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <a href={`tel:${selectedClient.phone}`} className="text-sm hover:underline">
                          {selectedClient.phone}
                        </a>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Building className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <span className="text-sm">{selectedClient.address}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Notes</h3>
                    <p className="text-sm text-muted-foreground">{selectedClient.notes || "No notes available"}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Projects</h3>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Total Projects</span>
                        <span className="text-sm">{selectedClient.projects}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm font-medium">Total Revenue</span>
                        <span className="text-sm">${selectedClient.totalRevenue.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <Link 
                        to={`/projects?client=${selectedClient.id}`} 
                        className="text-sm text-primary hover:underline"
                      >
                        View all projects
                      </Link>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Recent Activity</h3>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        No recent activity to display
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Button 
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    handleDeleteClient(selectedClient.id);
                  }}
                  className="gap-1"
                >
                  <Trash className="h-4 w-4" />
                  Delete Client
                </Button>
                
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsClientDetailsOpen(false)}>
                    Close
                  </Button>
                  <Button>
                    Edit Client
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Clients;
