"use client";

import { useGetTasksQuery } from "@/hooks/useGetTasksQuery";
import { Task as TaskType } from "@/types";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";

const aggregateTasksByCompletionDate = (tasks: TaskType[]) => {
  return tasks.reduce((acc, curr) => {
    const prevTasks = acc[curr?.completionDate || "sem data"];
    return {
      ...acc,
      [curr?.completionDate || "sem data"]: [...(prevTasks || []), curr],
    };
  }, {} as Record<string, TaskType[] | null>);
};

export default function DashboardPage() {
  const { data, isLoading, isSuccess } = useGetTasksQuery();
  const aggregatedTasks = aggregateTasksByCompletionDate(isSuccess ? data : []);

  return (
    <>
      <Header />
      <Tasks data={aggregatedTasks} isLoading={isLoading} />
    </>
  );
}
