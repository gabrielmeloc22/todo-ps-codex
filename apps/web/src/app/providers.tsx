"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Auth } from "@/components/Auth";
import { queryClient } from "@/services/reactQuery";
import { TooltipProvider } from "ui";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Auth>
        <TooltipProvider>{children}</TooltipProvider>
      </Auth>
    </QueryClientProvider>
  );
}
