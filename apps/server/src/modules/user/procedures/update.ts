import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import { trpcEnsureAuthenticated } from "../../../middleware/trpc.auth";
import UpdateUserUseCase from "../useCases/update";

const authenticatedProcedure = publicProcedure.use(trpcEnsureAuthenticated);

export const updateUserController = authenticatedProcedure
.input(z.object({
    email: z.string().optional(),
    password: z.string().optional(),
    name: z.string().optional(),
    lastName: z.string().optional(),
    age: z.number().optional().nullable(),
    gender: z.string().optional().nullable(),
    id: z.string(),
    profilePic : z.string().optional().nullable(),
}))
.mutation(async (opts) => {
    const { input } = opts;
    const { id: userId , ...user } = input as { id: string } & typeof input;
    return await UpdateUserUseCase.execute(userId , user);
});