import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Popover, Button } from "ui";
import { PopoverTrigger, PopoverContent } from "ui/src/components/Popover";
import { useDeleteTaskMutation } from "../../../../../hooks/useDeleteTaskMutation";

interface RemoveTaskPopover {
  taskId: string;
}

export function RemoveTaskPopover({ taskId }: RemoveTaskPopover) {
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useDeleteTaskMutation();

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
          <Button
            variant="destructive"
            loading={isLoading}
            onClick={() => {
              mutate({ id: taskId });
            }}
          >
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
