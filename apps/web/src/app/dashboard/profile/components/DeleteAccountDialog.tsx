import { signOut, useAuth } from "@/components/Auth";
import { trpc } from "@/services/trpc";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  useToast,
} from "ui";

export function DeleteAccountDialog() {
  const router = useRouter();
  const { mutateAsync, isLoading } = trpc.user.deleteUser.useMutation({
    onSuccess: () => {
      signOut();
      router.replace("login");
      toast({
        description: "Conta excluída com sucesso!",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Algo de errado aconteceu, conta não excluída.",
        variant: "destructive",
      });
    },
  });
  const [open, setOpen] = useState(false);
  const user = useAuth();
  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="relative flex flex-col gap-6 items-center text-center p-8 overflow-hidden">
        <DialogHeader className="before:bg-red-900/40 before:absolute before:top-0 before:left-0 before:w-full before:h-[35%] -z-10 mb-6">
          <DialogTitle className="z-10 text-red-500">Você quer realmente deletar sua conta?</DialogTitle>
        </DialogHeader>
        <DialogDescription className="max-w-[70%]">
          Essa ação é irreversível e todos seus dados serão perdidos para sempre.
        </DialogDescription>
        <div className="flex gap-6">
          <Button
            id="deleteAccount"
            variant="destructive"
            loading={isLoading}
            onClick={() => {
              mutateAsync(user.id);
            }}
          >
            Deletar conta
          </Button>
          <Button
            id="deleteAccount"
            variant="secondary"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
      <DialogTrigger asChild>
        <Button id="deleteAccount" variant="destructive" className="w-fit">
          Deletar conta
        </Button>
      </DialogTrigger>
    </Dialog>
  );
}
