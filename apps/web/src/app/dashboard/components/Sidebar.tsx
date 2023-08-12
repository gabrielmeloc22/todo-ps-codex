"use client";

import { useAuth } from "@/components/Auth";
import { trpc } from "@/services/trpc";
import { TaskRouterInputs } from "api";
import { HomeIcon, PlusIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button, useToast } from "ui";
import { Profile } from "./Profile";
import { TaskDialog } from "./Task/TaskDialog";

export function Sidebar() {
  const context = trpc.useContext();
  const { mutateAsync } = trpc.task.createTask.useMutation({
    onSuccess: (data) => {
      context.task.getAllTasks.setData({ authorId: data.authorId }, (oldData) => oldData?.concat(data));
    },
  });
  const { toast } = useToast();
  const user = useAuth();

  const onSubmit = async (data: Omit<TaskRouterInputs["createTask"], "authorId">) => {
    try {
      await mutateAsync({
        authorId: user.id,
        ...data,
      });
      toast({
        description: "Tarefa criada com sucesso!",
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
    <>
      <aside className="w-full max-w-[280px] max-xl:hidden flex flex-col gap-8 px-6 py-4 bg-zinc-800">
        <div className="z-0 relative w-full pb-4 after:absolute after:left-[-1.5rem] after:top-[-1.5rem] after:w-[calc(100%+3rem)] after:h-[calc(100%+1.5rem)] after:bg-zinc-900/40 after:-z-10">
          <Link href="/dashboard" className="flex gap-4 items-center">
            <div className="rounded-full bg-zinc-900/70 w-fit h-fit p-2">✅</div>
            <h2 className="font-bold">AllDone</h2>
          </Link>
        </div>
        <div>
          <Profile />
          <div className="flex flex-col gap-4 mt-6">
            <TaskDialog
              actionDescription="Adicionar"
              title="Adicionar tarefa"
              onSubmit={onSubmit}
              trigger={
                <Button className="w-[90%] px-4" size="lg">
                  Adicionar tarefa <PlusIcon className="ml-2" size={16} />
                </Button>
              }
            />
          </div>
        </div>
      </aside>
      <aside className="hidden max-xl:flex max-sm:hidden flex-col gap-6 items-center w-24 bg-zinc-800 py-6">
        <Link href="/dashboard">
          <div className="rounded-full bg-zinc-900/70 w-fit h-fit p-2 mb-8">✅</div>
        </Link>
        <TaskDialog
          actionDescription="Adicionar"
          title="Adicionar tarefa"
          onSubmit={onSubmit}
          trigger={
            <Button className="w-fit h-fit p-2" size="lg">
              <PlusIcon size={20} />
            </Button>
          }
        />
        <Link href="/dashboard">
          <Button variant="icon" className="w-fit h-fit p-2 rounded-xl">
            <HomeIcon size={20} />
          </Button>
        </Link>
        <Link href="/dashboard/profile">
          <Button variant="icon" className="w-fit h-fit p-2 rounded-xl">
            <UserIcon size={20} />
          </Button>
        </Link>
      </aside>
      <aside className="z-10 hidden max-sm:flex gap-10 justify-center p-4 w-full  fixed left-[50%] translate-x-[-50%] bottom-0 mx-auto bg-zinc-800/70 backdrop-blur-md">
        <TaskDialog
          actionDescription="Adicionar"
          title="Adicionar tarefa"
          onSubmit={onSubmit}
          trigger={
            <Button className="w-fit h-fit p-2 rounded-xl" size="lg">
              <PlusIcon size={24} />
            </Button>
          }
        />
        <Link href="/dashboard">
          <Button variant="icon" className="w-fit h-fit p-2 rounded-xl">
            <HomeIcon />
          </Button>
        </Link>
        <Link href="/dashboard/profile">
          <Button variant="icon" className="w-fit h-fit p-2 rounded-xl">
            <UserIcon />
          </Button>
        </Link>
      </aside>
    </>
  );
}
