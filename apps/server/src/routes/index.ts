import collectioRoutes from "../../trash/collection/routes";
import express from "express";
import cors from "cors";
import * as trpcExpress from '@trpc/server/adapters/express'
import { createContext } from "../trpc";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { appRouter } from "./trpc";


const routes = (app: any) => {
  app
    .use(cors())
    .use(express.json())
    .use("/trpc", trpcExpress.createExpressMiddleware({ router: appRouter, createContext }))
    .use(ensureAuthenticated)
    .use("/collection", collectioRoutes)
};

export default routes;
