
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CreditCard, 
  Settings, 
  BarChart3, 
  HelpCircle,
  LogOut,
  CheckSquare,
  MessageSquare,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Define navigation items by role
const adminNavItems = [
  { name: "Dashboard", path: "/", icon: <LayoutDashboard className="h-5 w-5" /> },
  { name: "Clients", path: "/clients", icon: <Users className="h-5 w-5" /> },
  { name: "Projects", path: "/projects", icon: <FileText className="h-5 w-5" /> },
  { name: "Invoices", path: "/invoices", icon: <CreditCard className="h-5 w-5" /> },
  { name: "Reports", path: "/reports", icon: <BarChart3 className="h-5 w-5" /> },
];

const clientNavItems = [
  { name: "Dashboard", path: "/", icon: <LayoutDashboard className="h-5 w-5" /> },
  { name: "Deliverables", path: "/deliverables", icon: <CheckSquare className="h-5 w-5" /> },
  { name: "Feedback", path: "/feedback", icon: <MessageSquare className="h-5 w-5" /> },
  { name: "Timeline", path: "/timeline", icon: <Calendar className="h-5 w-5" /> },
  { name: "Invoices", path: "/invoices", icon: <CreditCard className="h-5 w-5" /> },
];

const bottomNavItems = [
  { name: "Settings", path: "/settings", icon: <Settings className="h-5 w-5" /> },
  { name: "Help", path: "/help", icon: <HelpCircle className="h-5 w-5" /> },
];

interface SidebarProps {
  userRole?: "admin" | "client";
  clientBranding?: {
    primaryColor?: string;
    logoUrl?: string;
  }
}

export function Sidebar({ userRole = "admin", clientBranding }: SidebarProps) {
  // Determine which nav items to show based on role
  const navItems = userRole === "admin" ? adminNavItems : clientNavItems;
  
  // Define brand style for client customization
  const brandStyles = clientBranding?.primaryColor 
    ? { 
        "--brand-color": clientBranding.primaryColor,
        "--brand-hover": clientBranding.primaryColor + "cc" // Add transparency for hover state
      } as React.CSSProperties
    : {};

  return (
    <div 
      className="h-full flex flex-col bg-sidebar border-r border-sidebar-border"
      style={brandStyles}
    >
      <div className="p-6">
        <div className="flex items-center gap-2 font-semibold text-xl text-sidebar-foreground mb-8">
          {clientBranding?.logoUrl ? (
            <img 
              src={clientBranding.logoUrl} 
              alt="Client Logo" 
              className="h-8 w-auto" 
            />
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-6 w-6 text-primary"
            >
              <path d="M12 6v12"></path>
              <path d="M6 12h12"></path>
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
            </svg>
          )}
          <span>
            {userRole === "client" ? "Client Portal" : "Scope Sentinel"}
          </span>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? clientBranding?.primaryColor 
                      ? "bg-opacity-20 text-sidebar-foreground" 
                      : "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )
              }
              end={item.path === "/"}
              style={({ isActive }) => 
                isActive && clientBranding?.primaryColor 
                  ? { backgroundColor: clientBranding.primaryColor + "33" } 
                  : {}
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-6 border-t border-sidebar-border">
        <nav className="space-y-1">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? clientBranding?.primaryColor 
                      ? "bg-opacity-20 text-sidebar-foreground" 
                      : "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )
              }
              style={({ isActive }) => 
                isActive && clientBranding?.primaryColor 
                  ? { backgroundColor: clientBranding.primaryColor + "33" } 
                  : {}
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </nav>
      </div>
    </div>
  );
}
