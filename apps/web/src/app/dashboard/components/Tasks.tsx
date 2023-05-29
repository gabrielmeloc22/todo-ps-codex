import { Skeleton, useToast } from "ui";
import { useDeleteTaskMutation } from "@/hooks/useDeleteTaskMutation";
import { useUpdateTaskMutation } from "@/hooks/useUpdateTaskMutation";
import type { Task as TaskModel } from "@/types";
import { Task } from "./Task";
import { OnSubmitTask } from "./Task/TaskDialog";

const isOldTask = (completionDate: Date) => {
  return completionDate.getTime() < Date.now();
};

interface TasksProps {
  data: Record<string, TaskModel[] | null>;
  isLoading: boolean;
}

export function Tasks({ data, isLoading }: TasksProps) {
  const { mutateAsync: updateTask } = useUpdateTaskMutation();
  const { mutateAsync: deleteTask } = useDeleteTaskMutation();
  const { toast } = useToast();

  const onUpdate: OnSubmitTask = async (data) => {
    try {
      await updateTask(data);
      toast({
        description: "Tarefa editada com sucesso!",
        variant: "success",
      });
    } catch {
      toast({
        description: "Algo de errado aconteceu!",
        variant: "destructive",
      });
    }
  };

  const onCheck: OnSubmitTask = async (data) => {
    try {
      await updateTask(data);
      data.status &&
        toast({
          description: "Tarefa concluída!",
          variant: "success",
        });
    } catch {
      toast({
        description: "Algo de errado aconteceu!",
        variant: "destructive",
      });
    }
  };

  const onDelete: OnSubmitTask = async ({ id }) => {
    try {
      await deleteTask({ id: id! });
      toast({
        description: "Tarefa excluída com sucesso!",
        variant: "success",
      });
    } catch (error) {
      toast({
        description: "Algo de errado aconteceu!",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="max-w-screen-lg grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] grid-flow-row gap-4">
      {isLoading
        ? Array.from(new Array(7)).map((_, i) => <Skeleton key={i} className="w-[100%] h-16" />)
        : Object.entries(data).map(([key, value]) => {
            return value !== null ? (
              <div key={key} className="max-w-md">
                <p
                  className={`mb-4 text-base ${
                    key !== "sem data" ? (isOldTask(new Date(key)) ? "text-red-400" : "") : ""
                  }`}
                >
                  {key !== "sem data" ? new Intl.DateTimeFormat().format(new Date(key)) : key}
                </p>
                {value
                  .sort(({ id }, { id: id2 }) => id.localeCompare(id2))
                  .map((task) => {
                    return (
                      <Task
                        key={task.id}
                        data={task}
                        onCheck={onCheck}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                      />
                    );
                  })}
              </div>
            ) : (
              value
            );
          })}
    </section>
  );
}
