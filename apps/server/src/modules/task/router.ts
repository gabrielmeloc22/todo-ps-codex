import { z } from "zod";
import { publicProcedure, router } from "../../trpc";
import createTaskUseCase from "./useCases/create";
import getTaskUseCase from "./useCases/get";
import DeleteTaskUseCase from "./useCases/delete";
import UpdateTaskUseCase from "./useCases/update";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import CheckUser from "../../utils/checkUser";
import { trpcEnsureAuthenticated } from "../../middleware/trpc.auth";

export type taskRouterInputs = inferRouterInputs<typeof taskRouter>;
export type taskRouterOutputs = inferRouterOutputs<typeof taskRouter>;

const authenticatedProcedure = publicProcedure.use(trpcEnsureAuthenticated);

export const taskRouter = router({
  createTask: authenticatedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string().optional().nullable(),
        completionDate: z.string().optional().nullable(),
        status: z.boolean().optional(),
        authorId: z.string(),
        collectionId: z.string().optional().nullable(),
      }))
    .mutation(async (opts) => {
      const { input, ctx } = opts;
      CheckUser.check(ctx.userId, input.authorId);
      const date = createTaskUseCase.stringToDate(input.completionDate);
      return await createTaskUseCase.execute({ ...input, completionDate: date });
    }),

    getTask: authenticatedProcedure
    .input(z.string())
    .query(async (opts) => {
      const { input, ctx } = opts;
      CheckUser.check(ctx.userId, input);
      return await getTaskUseCase.execute(input);
    }),

    deleteTask: authenticatedProcedure
    .input(z.string())
    .mutation(async (opts) => {
      const { input, ctx } = opts;
      CheckUser.check(ctx.userId, input);
      return await DeleteTaskUseCase.execute(input)
    }),

    updateTask: authenticatedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
        completionDate: z.string().optional(),
        authorId: z.string(),
        status: z.boolean().optional(),
        collectionId: z.string().optional(),
      })
    ).mutation(async (opts) => {
      const { input, ctx } = opts;
      CheckUser.check(ctx.userId, input.authorId);
      const { id: _, authorId: x, ...user } = input;
      return await UpdateTaskUseCase.execute(input.id, user)
    })
});
