"use client";

import { Skeleton } from "ui";
import { useGetTasksQuery } from "@/hooks/useGetTasksQuery";
import { Task as TaskType } from "@/types";
import { Header } from "./components/Header";
import { Task } from "./components/Task";

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
      <section className="max-w-screen-lg grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] grid-flow-row gap-4 mt-10">
        {isLoading
          ? Array.from(new Array(7)).map((_, i) => <Skeleton key={i} className="w-[100%] h-16" />)
          : Object.entries(aggregatedTasks).map(([key, value]) => {
              return value !== null ? (
                <div key={key}>
                  <p className="mb-4 text-base">
                    {key !== "sem data" ? new Intl.DateTimeFormat().format(new Date(key)) : key}
                  </p>
                  {value.map((task) => {
                    return <Task key={task.id} data={task} />;
                  })}
                </div>
              ) : (
                value
              );
            })}
      </section>
    </>
  );
}
