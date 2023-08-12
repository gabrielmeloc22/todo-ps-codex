import { useAuth } from "@/components/Auth";
import { trpc } from "@/services/trpc";
import type { Task as TaskType } from "@/types";
import { TaskRouterInputs } from "api";
import { Skeleton, useToast } from "ui";
import { Task } from "./Task";
import { OnSubmitTask } from "./Task/TaskDialog";

const isOldTask = (completionDate: Date) => {
  return completionDate.getTime() < Date.now();
};

interface TasksProps {
  data: Record<string, TaskType[] | null>;
  isLoading: boolean;
}

export function Tasks({ data, isLoading }: TasksProps) {
  const context = trpc.useContext();
  const { toast } = useToast();

  const { id: userId } = useAuth();
  const { mutateAsync: updateTask } = trpc.task.updateTask.useMutation({
    onSuccess: (data) => {
      context.task.getAllTasks.setData({ authorId: data.authorId }, (oldData: any) => {
        const copy = [...(oldData || [])];
        copy.splice(
          copy.findIndex(({ id }) => data.id === id),
          1,
          data
        );

        return copy;
      });
    },
    onError: () => {
      toast({
        description: "Algo de errado aconteceu!",
        variant: "destructive",
      });
    },
  });

  const { mutateAsync: deleteTask } = trpc.task.deleteTask.useMutation({
    onSuccess: (data) => {
      context.task.getAllTasks.setData({ authorId: data.authorId }, (oldData) =>
        oldData?.filter(({ id }) => data.id !== id)
      );
    },
    onError: () => {
      toast({
        description: "Algo de errado aconteceu!",
        variant: "destructive",
      });
    },
  });

  const onUpdate: OnSubmitTask = async (data: Omit<TaskRouterInputs["updateTask"], "authorId">) => {
    await updateTask({ authorId: userId, ...data });
    toast({
      description: "Tarefa editada com sucesso!",
      variant: "success",
    });
  };

  const onCheck: OnSubmitTask = async (data) => {
    await updateTask({ authorId: userId, ...data });
    data.status &&
      toast({
        description: "Tarefa concluída!",
        variant: "success",
      });
  };

  const onDelete: OnSubmitTask = async ({ id: taskId }) => {
    await deleteTask({ taskId, authorId: userId });
    toast({
      description: "Tarefa excluída com sucesso!",
      variant: "success",
    });
  };

  return (
    <section className="max-w-screen-lg grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] grid-flow-row gap-4 mt-10">
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
                  {key !== "sem data"
                    ? new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: "medium",
                      }).format(new Date(key))
                    : key}
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
