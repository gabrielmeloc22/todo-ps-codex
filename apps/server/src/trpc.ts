import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });
export type Context = inferAsyncReturnType<typeof createContext>;

export const trpc = initTRPC.context<Context>().create();

export const router = trpc.router;
export const middleware = trpc.middleware;
export const publicProcedure = trpc.procedure;

export default trpc;