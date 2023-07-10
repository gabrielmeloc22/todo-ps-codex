import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import { trpcEnsureAuthenticated } from "../../../middleware/trpc.auth";
import CheckUser from "../../../utils/checkUser";
import DeleteCollectionUseCase from "../useCases/delete";

const authenticatedProcedure = publicProcedure.use(trpcEnsureAuthenticated);

export const deleteCollection = authenticatedProcedure
.input(
    z.object({
        authorId: z.string(),
        id: z.string(),
    }))
.mutation(async (opts) => {
    const { input, ctx } = opts;
    CheckUser.check(ctx.userId, input.authorId);
    return await DeleteCollectionUseCase.execute(input.id)
})