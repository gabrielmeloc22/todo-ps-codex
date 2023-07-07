import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import CreateUserUseCase from "../useCases/create";

export const createUserController = publicProcedure
  .input(
    z.object({
      email: z.string(),
      password: z.string(),
      name: z.string(),
      lastName: z.string(),
      age: z.number().optional(),
      gender: z.string().optional(),
    })
  )
  .mutation(async (opts) => {
    const { input } = opts;
    return await CreateUserUseCase.execute(input);
  });
