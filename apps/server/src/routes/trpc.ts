import { taskRouter, TaskRouterInputs, TaskRouterOutputs } from "../modules/task/router";
import { userRouter, UserRouterInputs, UserRouterOutputs } from "../modules/user/router";
import { router } from "../trpc";

export const appRouter = router({
    task: taskRouter,
    user: userRouter,
})

export type AppRouter = typeof appRouter;
export { TaskRouterInputs, TaskRouterOutputs, UserRouterInputs, UserRouterOutputs };