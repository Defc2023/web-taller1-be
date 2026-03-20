"use client";

import { ReactNode } from "react";
import { ToastProvider } from "@/components/Toast";
import Sidebar from "@/components/Sidebar";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <Sidebar />
      <main className="lg:pl-64 min-h-screen pb-20 lg:pb-0">
        {children}
      </main>
    </ToastProvider>
  );
}
