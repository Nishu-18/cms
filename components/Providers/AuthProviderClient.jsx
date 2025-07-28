"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../app-sidebar";
import Navbar from "../NavBar";

export default function AuthProviderClient({ session, children }) {
  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <Navbar session={session} />
          {children}
          <Toaster position="top-right" richColors />
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
}
