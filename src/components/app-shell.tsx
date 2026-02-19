"use client";

import React from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Footer } from "@/components/footer";
import { useVideoStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  hideSidebar?: boolean;
}

export function AppShell({ children, hideSidebar = false }: AppShellProps) {
  const { sidebarOpen } = useVideoStore();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {!hideSidebar && <Sidebar />}
      <main
        className={cn(
          "pt-14 min-h-screen transition-all duration-200",
          !hideSidebar && sidebarOpen && "md:pl-[240px]",
          !hideSidebar && !sidebarOpen && "md:pl-[72px]"
        )}
      >
        {children}
        <Footer />
      </main>
    </div>
  );
}
