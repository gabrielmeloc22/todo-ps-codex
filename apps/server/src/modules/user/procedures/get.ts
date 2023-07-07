import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import { trpcEnsureAuthenticated } from "../../../middleware/trpc.auth";
import GetUserUseCase from "../useCases/get";

const authenticatedProcedure = publicProcedure.use(trpcEnsureAuthenticated);

export const getUserController = authenticatedProcedure.input(z.string()).query(async (opts) => {
  const { input } = opts;
  return await GetUserUseCase.execute(input);
});
