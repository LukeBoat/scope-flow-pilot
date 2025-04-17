
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Clients = () => {
  // Mock data for clients
  const clients = [
    { id: 1, name: "Acme Inc.", email: "contact@acmeinc.com", projects: 3, status: "Active" },
    { id: 2, name: "Globex Corp", email: "info@globex.com", projects: 2, status: "Active" },
    { id: 3, name: "Initech", email: "support@initech.com", projects: 1, status: "Inactive" },
  ];

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <Card key={client.id}>
            <CardHeader className="pb-2">
              <CardTitle>{client.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{client.email}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm">
                  {client.projects} {client.projects === 1 ? "Project" : "Projects"}
                </span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  client.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}>
                  {client.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Clients;
