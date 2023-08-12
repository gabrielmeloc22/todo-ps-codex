import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import { trpcEnsureAuthenticated } from "../../../middleware/trpc.auth";
import CheckUser from "../../../utils/checkUser";
import createTaskUseCase from "../useCases/create";

const authenticatedProcedure = publicProcedure.use(trpcEnsureAuthenticated);

export const createTask = authenticatedProcedure
  .input(
    z.object({
      title: z.string(),
      content: z.string().optional().nullable(),
      completionDate: z.string().optional().nullable(),
      status: z.boolean().optional(),
      authorId: z.string(),
      collectionId: z.string().optional().nullable(),
    })
  )
  .mutation(async (opts) => {
    const { input, ctx } = opts;
    CheckUser.check(ctx.userId, input.authorId);
    const date = createTaskUseCase.stringToDate(input.completionDate);
    return await createTaskUseCase.execute({ ...input, completionDate: date });
  });
