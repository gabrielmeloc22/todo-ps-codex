import { collectionRouter, CollectionRouterInputs, CollectionRouterOutputs } from "../modules/collection/router";
import { taskRouter, TaskRouterInputs, TaskRouterOutputs } from "../modules/task/router";
import { userRouter, UserRouterInputs, UserRouterOutputs } from "../modules/user/router";
import { router } from "../trpc";

export const appRouter = router({
    task: taskRouter,
    user: userRouter,
    collection: collectionRouter,
})

export type AppRouter = typeof appRouter;
export type { CollectionRouterInputs, CollectionRouterOutputs, TaskRouterInputs, TaskRouterOutputs, UserRouterInputs, UserRouterOutputs };

