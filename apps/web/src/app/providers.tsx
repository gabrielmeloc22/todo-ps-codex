"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Auth } from "@/components/Auth";
import { queryClient } from "@/services/reactQuery";
import { TooltipProvider } from "ui";
import { trpc, trpcClient } from "@/services/trpc";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Auth>
          <TooltipProvider>{children}</TooltipProvider>
        </Auth>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
