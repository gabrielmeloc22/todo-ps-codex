"use client";

import { Metadata } from "next";
import { useGetTasksQuery } from "../../../hooks/useGetTasksQuery";
import { Header } from "./components/Header";
import { Task } from "./components/Task";

export const metadata: Metadata = {
  title: "AllDone | Visão Geral",
};

export default function DashboardPage() {
  const { data, isLoading, isSuccess } = useGetTasksQuery();

  return (
    <main className="w-full max-w-[40vw] flex h-screen ml-[8vw] flex-col gap-32 px-10 py-20">
      <Header />
      <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-flow-row gap-4 mt-10">
        {isSuccess &&
          data.map((task) => {
            return <Task key={task.id} data={task} />;
          })}
      </section>
    </main>
  );
}
