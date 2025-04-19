
import React from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {
  children?: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 h-full">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <ScrollArea className="flex-1">
          <main className="p-6 h-full">
            {children || <Outlet />}
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
