import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import { trpcEnsureAuthenticated } from "../../../middleware/trpc.auth";
import GetUserUseCase from "../useCases/get";
import CheckUser from "../../../utils/checkUser";

const authenticatedProcedure = publicProcedure.use(trpcEnsureAuthenticated);

export const getUserController = authenticatedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async (opts) => {
    const { input, ctx } = opts;
    CheckUser.check(ctx.userId, input.id);
    return await GetUserUseCase.execute(input.id);
  });
