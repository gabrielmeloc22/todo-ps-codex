import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui";

export function DeleteAccountDialog() {
  const [open, setOpen] = useState(false);

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
          <Button id="deleteAccount" variant="destructive">
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
