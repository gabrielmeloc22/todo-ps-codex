import { z } from "zod";
import { publicProcedure, router } from "../../trpc";
import createTaskUseCase from "./useCases/create";
import getTaskUseCase from "./useCases/get";
import DeleteTaskUseCase from "./useCases/delete";
import UpdateTaskUseCase from "./useCases/update";


export const taskRouter = router({
  createTask: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        completionDate: z.string(),
        status: z.boolean().optional(),
        authorId: z.string(),
        collectionId: z.string(),
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
        title: z.string(),
        content: z.string(),
        completionDate: z.string(),
        status: z.boolean().optional(),
        authorId: z.string(),
        collectionId: z.string(),
      })
    ).mutation(async (opts) => {
      const { input } = opts;
      const { id: _, ...user } = input;
      return await UpdateTaskUseCase.execute(input.id, user)
    })
});

export type taskRouterType = typeof taskRouter;