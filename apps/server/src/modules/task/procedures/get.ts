import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import CheckUser from "../../../utils/checkUser";
import { trpcEnsureAuthenticated } from "../../../middleware/trpc.auth";
import { GetTaskUseCase, GetAllTasksUseCase } from "../useCases/get";

const authenticatedProcedure = publicProcedure.use(trpcEnsureAuthenticated);

export const getTaskController = authenticatedProcedure.input(z.string()).query(async (opts) => {
  const { input, ctx } = opts;
  CheckUser.check(ctx.userId, input);
  return await GetTaskUseCase.execute(input);
});

export const getAllTasksController = authenticatedProcedure.input(z.string()).query(async (opts) => {
  const { input, ctx } = opts;
  CheckUser.check(ctx.userId, input);
  return await GetAllTasksUseCase.execute(input, "asc");
});
