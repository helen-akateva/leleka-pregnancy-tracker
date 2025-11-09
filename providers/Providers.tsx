"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./AuthProviders";
import SideBar from "@/components/MainLayout/SideBar/SideBar";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster position="top-right" />

        <SideBar />
        <ConfirmationModal />

        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}
