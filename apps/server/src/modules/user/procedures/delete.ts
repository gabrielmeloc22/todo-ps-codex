import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import { trpcEnsureAuthenticated } from "../../../middleware/trpc.auth";
import DeleteUserUseCase from "../useCases/delete";

const authenticatedProcedure = publicProcedure.use(trpcEnsureAuthenticated);

export const deleteUserController = authenticatedProcedure.input(z.string()).mutation(async (opts) => {
  const { input } = opts;
  return await DeleteUserUseCase.execute(input);
});
