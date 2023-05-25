"use client";

import { forwardRef } from "react";
import { Checkbox, Label } from "ui";
import { useUpdateTaskMutation } from "@/hooks/useUpdateTaskMutation";
import { Task as TaskModel } from "@/types";
import { UpdateTaskDialog } from "./UpdateTaskDialog";
import { RemoveTaskPopover } from "./RemoveTaskPopover";

interface TaskProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TaskModel;
}

export const Task = forwardRef<HTMLDivElement, TaskProps>(function Task({ data, ...props }, ref) {
  const { id, status, title, completionDate } = data;
  const { mutate } = useUpdateTaskMutation();
  return (
    <div
      className="flex gap-4 px-4 py-6 min-h-[6rem] items-start hover:bg-zinc-800 rounded-md overflow-hidden duration-300 animate-in fade-in-10 slide-in-from-right-4"
      ref={ref}
      {...props}
    >
      <Checkbox
        id={id}
        defaultChecked={status}
        onCheckedChange={(checked) => {
          mutate({ id, status: !!checked });
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
        <UpdateTaskDialog task={data} />
        <RemoveTaskPopover taskId={id} />
      </div>
    </div>
  );
});

Task.displayName = "Task";
