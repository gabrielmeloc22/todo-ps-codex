import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import { trpcEnsureAuthenticated } from "../../../middleware/trpc.auth";
import CheckUser from "../../../utils/checkUser";
import UpdateCollectionUsecase from "../useCases/update";
import { Prisma } from "@prisma/client";
const authenticatedProcedure = publicProcedure.use(trpcEnsureAuthenticated);

export const updateCollection = authenticatedProcedure
  .input(
    z.object({
      authorId: z.string(),
      id: z.string(),
      title: z.string().optional(),
      color: z.string().optional(),
    })
  )
  .mutation(async (opts) => {
    const { input, ctx } = opts;
    CheckUser.check(ctx.userId, input.authorId);
    const { authorId, id, ...collection } = input;
    return await UpdateCollectionUsecase.execute(id, collection);
  });
