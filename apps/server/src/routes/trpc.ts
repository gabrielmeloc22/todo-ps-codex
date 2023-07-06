import { mergeRouters } from "@trpc/server";
import { taskRouter } from "../modules/task/router";
import trpc from "../trpc";

const appRouter = trpc.mergeRouters(taskRouter);

export type AppRouter = typeof appRouter;