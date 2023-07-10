import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import { trpcEnsureAuthenticated } from "../../../middleware/trpc.auth";
import CheckUser from "../../../utils/checkUser";
import GetCollectionUseCase from "../useCases/get";

const authenticatedProcedure = publicProcedure.use(trpcEnsureAuthenticated);

export const getCollection = authenticatedProcedure
.input( z.object({
    authorId: z.string(),
    includeTasks: z.boolean(),
    id: z.string(),
}))
.query(async (opts) => {
    const { input, ctx } = opts;
    CheckUser.check(ctx.userId, input.authorId);
    return await GetCollectionUseCase.execute(input.id, input.includeTasks)
})