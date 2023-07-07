import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import CheckUser from "../../../utils/checkUser";
import { trpcEnsureAuthenticated } from "../../../middleware/trpc.auth";
import DeleteTaskUseCase from "../useCases/delete";

const authenticatedProcedure = publicProcedure.use(trpcEnsureAuthenticated);

export const deleteTaskController = authenticatedProcedure
.input(z.string())
.mutation(async (opts) => {
  const { input, ctx } = opts;
  CheckUser.check(ctx.userId, input);
  return await DeleteTaskUseCase.execute(input)
});