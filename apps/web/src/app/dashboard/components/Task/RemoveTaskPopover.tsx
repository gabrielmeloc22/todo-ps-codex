import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button, Popover } from "ui";
import { PopoverContent, PopoverTrigger } from "ui/src/components/Popover";

interface RemoveTaskPopover {
  onDelete: () => Promise<void>;
}

export function RemoveTaskPopover({ onDelete: onDeleteFn }: RemoveTaskPopover) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    await onDeleteFn();
    setIsLoading(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="icon" size="sm">
          <Trash2 strokeWidth={1.5} size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit" align="end" alignOffset={-16}>
        <p className="mb-4">Excluir tarefa?</p>
        <div className="flex gap-4">
          <Button variant="destructive" loading={isLoading} onClick={onDelete}>
            Excluir
          </Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
