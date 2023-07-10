import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import { trpcEnsureAuthenticated } from "../../../middleware/trpc.auth";
import CreateCollectionUseCase from "../useCases/create";
import CheckUser from "../../../utils/checkUser";

const authenticatedProcedure = publicProcedure.use(trpcEnsureAuthenticated);

export const createCollection = authenticatedProcedure
.input(
    z.object({
        title: z.string(),
        color: z.string(),
        authorId: z.string(),
    }))
.mutation(async (opts) => {
    const { input, ctx } = opts;
    CheckUser.check(ctx.userId, input.authorId);
    return await CreateCollectionUseCase.execute(input);
})