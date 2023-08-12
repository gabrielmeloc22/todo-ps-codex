"use client";

import { useAuth } from "@/components/Auth";
import { trpc } from "@/services/trpc";
import { Task } from "@/types";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";

const aggregateTasksByCompletionDate = (tasks: Task[]) => {
  return tasks.reduce((acc, curr) => {
    const prevTasks = acc[curr?.completionDate || "sem data"];
    return {
      ...acc,
      [curr?.completionDate || "sem data"]: [...(prevTasks || []), curr],
    };
  }, {} as Record<string, Task[] | null>);
};

export default function DashboardPage() {
  const user = useAuth();

  const { data, isSuccess, isLoading } = trpc.task.getAllTasks.useQuery({
    authorId: user.id,
  });
  const aggregatedTasks = aggregateTasksByCompletionDate(isSuccess ? data : []);

  return (
    <>
      <Header />
      <Tasks data={aggregatedTasks} isLoading={isLoading} />
    </>
  );
}
