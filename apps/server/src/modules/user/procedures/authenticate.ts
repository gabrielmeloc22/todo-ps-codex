import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import AuthenticateUserUseCase from "../useCases/authenticate";

export const authenticateUserController = publicProcedure
  .input(
    z.object({
      email: z.string(),
      password: z.string(),
    })
  )
  .query(async (opts) => {
    const { input } = opts;
    return await AuthenticateUserUseCase.execute(input);
  });
