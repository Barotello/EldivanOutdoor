import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main className="w-full flex-1 flex flex-col relative min-h-screen">
        <div className="px-4 py-2.5 flex items-center gap-2 bg-white/95 backdrop-blur-md border-b border-light-outline-variant/60 sticky top-0 z-30 shadow-xs">
          <SidebarTrigger className="h-8 w-8 rounded-lg border border-black/10 bg-white text-ink hover:bg-black/5 shadow-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center" />
          <span className="font-mono-tech text-xs text-ink font-bold uppercase tracking-wider">
            Menü
          </span>
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}

export { Layout };
