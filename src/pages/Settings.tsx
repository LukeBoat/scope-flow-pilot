
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { BrandingSettings } from "@/components/settings/BrandingSettings";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Lock, Shield, Bell, Users, Palette, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="w-full grid grid-cols-3 md:grid-cols-6 h-auto p-1">
          <TabsTrigger value="general" className="flex gap-2 flex-col md:flex-row py-3">
            <Palette className="h-4 w-4" />
            <span>Branding</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2 flex-col md:flex-row py-3">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2 flex-col md:flex-row py-3">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="teams" className="flex gap-2 flex-col md:flex-row py-3">
            <Users className="h-4 w-4" />
            <span>Team</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex gap-2 flex-col md:flex-row py-3">
            <CreditCard className="h-4 w-4" />
            <span>Billing</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex gap-2 flex-col md:flex-row py-3">
            <Lock className="h-4 w-4" />
            <span>API</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <BrandingSettings />
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications about your projects and clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Notification settings will be added soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Security settings will be added soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>
                Invite team members and manage their roles and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Team management features will be added soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Current Plan
                <Badge variant="outline" className="ml-2">Free Plan</Badge>
              </CardTitle>
              <CardDescription>
                Your current subscription and usage details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Projects</span>
                  <span>2 of 3</span>
                </div>
                <div className="flex justify-between">
                  <span>Client Portals</span>
                  <span>2 of 3</span>
                </div>
                <div className="flex justify-between">
                  <span>White Labeling</span>
                  <span className="text-muted-foreground">Not Available</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Features</span>
                  <span className="text-muted-foreground">Not Available</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <PricingPlans />
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Keys & Integrations</CardTitle>
              <CardDescription>
                Manage API keys and external service integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-4 bg-muted/50">
                <div className="flex gap-2 items-center mb-2">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <p className="font-medium">Security Badge</p>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Your data is secured with Firebase Security Rules
                </p>
                <p className="text-xs p-2 bg-black/5 rounded font-mono overflow-x-auto">
                  match /projects/{'{'}projectId{'}'} {'{'}
                  <br />
                  &nbsp;&nbsp;allow read: if request.auth.uid != null && 
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;(request.auth.uid in resource.data.clientIds || request.auth.token.role == "admin");
                  <br />
                  &nbsp;&nbsp;allow write: if request.auth.token.role == "admin";
                  <br />
                  {'}'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Settings;
