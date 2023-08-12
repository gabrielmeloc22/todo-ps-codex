import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import CheckUser from "../../../utils/checkUser";
import { trpcEnsureAuthenticated } from "../../../middleware/trpc.auth";
import { GetTaskUseCase, GetAllTasksUseCase } from "../useCases/get";

const authenticatedProcedure = publicProcedure.use(trpcEnsureAuthenticated);

export const getTask = authenticatedProcedure
  .input(
    z.object({
      taskId: z.string(),
      authorId: z.string(),
    })
  )
  .query(async (opts) => {
    const { input, ctx } = opts;
    CheckUser.check(ctx.userId, input.authorId);
    return await GetTaskUseCase.execute(input.taskId);
  });

export const getAllTasks = authenticatedProcedure
  .input(
    z.object({
      authorId: z.string(),
    })
  )
  .query(async (opts) => {
    const { input, ctx } = opts;
    CheckUser.check(ctx.userId, input.authorId);
    return await GetAllTasksUseCase.execute(input.authorId, "asc");
  });
