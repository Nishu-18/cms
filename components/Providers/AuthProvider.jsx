"use client"
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../app-sidebar";
import Navbar from "../NavBar";
export function AuthProvider({ children }) {
    return <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <Navbar />
          {children}
          <Toaster position="top-right" richColors />
        </main>
      </SidebarProvider>
    </SessionProvider>
}