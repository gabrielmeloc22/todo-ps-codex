import { z } from "zod";
import { publicProcedure, router } from "../../trpc";
import createTaskUseCase from "./useCases/create";
import getTaskUseCase from "./useCases/get";
import DeleteTaskUseCase from "./useCases/delete";
import UpdateTaskUseCase from "./useCases/update";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";


export type taskRouterInputs = inferRouterInputs<typeof taskRouter>;
export type taskRouterOutputs = inferRouterOutputs<typeof taskRouter>;

export const taskRouter = router({
  createTask: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string().optional(),
        completionDate: z.string().optional(),
        status: z.boolean().optional(),
        authorId: z.string(),
        collectionId: z.string().optional(),
      }))
    .mutation(async (opts) => {
      const { input } = opts;
      const date = createTaskUseCase.stringToDate(input.completionDate);
      return await createTaskUseCase.execute({ ...input, completionDate: date });
    }),

    getTask: publicProcedure
    .input(z.string())
    .query(async (opts) => {
      const { input } = opts;
      return await getTaskUseCase.execute(input);
    }),

    deleteTask: publicProcedure
    .input(z.string())
    .mutation(async (opts) => {
      const { input } = opts;
      return await DeleteTaskUseCase.execute(input)
    }),

    updateTask: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
        completionDate: z.string().optional(),
        status: z.boolean().optional(),
        collectionId: z.string().optional(),
      })
    ).mutation(async (opts) => {
      const { input } = opts;
      const { id: _, ...user } = input;
      return await UpdateTaskUseCase.execute(input.id, user)
    })
});
