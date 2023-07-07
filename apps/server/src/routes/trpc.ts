import { taskRouter, taskRouterInputs, taskRouterOutputs } from "../modules/task/router";
import { router } from "../trpc";

export const appRouter = router({
    task: taskRouter,
    // user: userRouter,
})

export type AppRouter = typeof appRouter;
export { taskRouterInputs, taskRouterOutputs };