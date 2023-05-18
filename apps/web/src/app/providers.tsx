"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../services/ReactQuery";
import { ReactNode } from "react";
import { AuthContextProvider } from "../context/auth";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </QueryClientProvider>
  );
}
