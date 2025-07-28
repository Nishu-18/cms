"use client"
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../app-sidebar";
import Navbar from "../NavBar";
import { getAuthSession } from "../../lib/auth";
import ServerAuthProvider from "./ServerAuthProvider";
export async function AuthProvider({ children }) {
 
    return <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
        <ServerAuthProvider >
          <Navbar session={session} />
        </ServerAuthProvider>
          
          {children}
          <Toaster position="top-right" richColors />
        </main>
      </SidebarProvider>
    </SessionProvider>
}