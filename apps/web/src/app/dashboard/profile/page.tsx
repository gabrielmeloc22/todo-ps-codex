"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "ui";
import { DeleteAccountDialog } from "./components/DeleteAccountDialog";
import { Form } from "./components/Form";
import { Header } from "./components/Header";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen gap-10">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="absolute left-10 top-20"
            variant="icon"
            onClick={() => {
              router.push("dashboard");
            }}
          >
            <ArrowLeft />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Voltar para dashboard</TooltipContent>
      </Tooltip>
      <Header />
      <Form />
      <DeleteAccountDialog />
    </div>
  );
}
