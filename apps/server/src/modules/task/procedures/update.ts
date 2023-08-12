import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import CheckUser from "../../../utils/checkUser";
import { trpcEnsureAuthenticated } from "../../../middleware/trpc.auth";
import UpdateTaskUseCase from "../useCases/update";

const authenticatedProcedure = publicProcedure.use(trpcEnsureAuthenticated);

export const updateTask = authenticatedProcedure
.input(
  z.object({
    id: z.string(),
    title: z.string().optional(),
    content: z.string().optional().nullable(),
    completionDate: z.string().optional().nullable(),
    authorId: z.string(),
    status: z.boolean().optional(),
    collectionId: z.string().optional().nullable(),
  })
).mutation(async (opts) => {
  const { input, ctx } = opts;
  CheckUser.check(ctx.userId, input.authorId);
  const { id: _, authorId: x, ...user } = input;
  return await UpdateTaskUseCase.execute(input.id, user)
})