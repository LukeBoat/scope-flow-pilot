
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { InvoiceProvider } from "@/contexts/InvoiceContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DeliverableFeedback from "./pages/DeliverableFeedback";
import ClientDashboard from "./pages/ClientDashboard";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import Invoices from "./pages/Invoices";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import ClientHistory from "./pages/ClientHistory";
import ClientPDF from "./pages/ClientPDF";
import { AuthProvider } from "@/contexts/AuthContext";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { MainLayout } from "@/components/layout/MainLayout";
import { ClientPortalLayout } from "@/components/layout/ClientPortalLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <InvoiceProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/auth" element={<Login />} />
            
            {/* Protected routes */}
            <Route element={<RequireAuth><MainLayout /></RequireAuth>}>
              <Route path="/" element={<Index />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/clients/:clientId/history" element={<ClientHistory />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/deliverable-feedback" element={<DeliverableFeedback />} />
            </Route>
            
            {/* Client portal routes */}
            <Route element={<RequireAuth><ClientPortalLayout /></RequireAuth>}>
              <Route path="/client" element={<ClientDashboard />} />
              <Route path="/client/deliverables" element={<ClientDashboard />} />
              <Route path="/client/feedback" element={<ClientDashboard />} />
              <Route path="/client/invoices" element={<ClientDashboard />} />
              <Route path="/client/history" element={<ClientDashboard />} />
              <Route path="/client/pdf/:type/:id" element={<ClientPDF />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </InvoiceProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
