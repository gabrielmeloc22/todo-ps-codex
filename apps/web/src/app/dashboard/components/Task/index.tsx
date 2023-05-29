"use client";

import { Task as TaskModel } from "@/types";
import { cn } from "@ui/lib/utils";
import { Edit } from "lucide-react";
import { forwardRef } from "react";
import { Button, Checkbox, Label } from "ui";
import { RemoveTaskPopover } from "./RemoveTaskPopover";
import { OnSubmitTask, TaskDialog } from "./TaskDialog";

interface TaskProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TaskModel;
  onUpdate: OnSubmitTask;
  onDelete: OnSubmitTask;
  onCheck: OnSubmitTask;
}

export const Task = forwardRef<HTMLDivElement, TaskProps>(function Task(
  { data, onDelete, onUpdate, onCheck, className, ...props },
  ref
) {
  const { id, status, title, completionDate } = data;

  return (
    <div
      className={cn(
        "flex gap-4 px-4 py-6 min-h-[6rem] items-start hover:bg-zinc-800 rounded-md overflow-hidden duration-300 animate-in fade-in-10 slide-in-from-right-4",
        className
      )}
      ref={ref}
      {...props}
    >
      <Checkbox
        id={id}
        defaultChecked={status}
        onCheckedChange={(checked) => {
          onCheck({ id, status: !!checked });
        }}
      />
      <div className="flex flex-col gap-1 w-full peer-data-[state=checked]:[&>*>#task-title]:line-through">
        <div className="flex gap-4">
          <Label id="task-title" htmlFor={id} className="flex text-md align-top">
            {title}
          </Label>
        </div>
        <span className="text-sm font-normal text-zinc-400">
          {completionDate ? new Intl.DateTimeFormat().format(new Date(completionDate)) : "sem data"}
        </span>
      </div>
      <div className="flex gap-4 duration-200 animate-in fade-in-10 slide-in-from-right-5" id="task-tools">
        <TaskDialog
          actionDescription="Editar"
          title="Editar tarefa"
          onSubmit={onUpdate}
          trigger={
            <Button variant="icon" size="sm">
              <Edit strokeWidth={1.5} size={20} />
            </Button>
          }
          defaultValues={{
            id,
            title: data.title,
            completionDate: (data.completionDate && new Date(data.completionDate)) || undefined,
            content: data.content,
          }}
        />
        <RemoveTaskPopover onDelete={() => onDelete({ id })} />
      </div>
    </div>
  );
});

Task.displayName = "Task";
