import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="w-full flex-1 flex flex-col relative min-h-screen">
        {children}
      </main>
    </SidebarProvider>
  )
}

export { Layout };
