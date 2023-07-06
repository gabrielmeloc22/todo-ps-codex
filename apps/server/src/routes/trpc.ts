import { mergeRouters } from "@trpc/server";
import { taskRouter } from "../modules/task/router";
import trpc, { router } from "../trpc";

const appRouter = router({
    task: taskRouter,
    // user: userRouter,
})

export type AppRouter = typeof appRouter;