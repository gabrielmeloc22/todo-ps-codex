import express, { Request, Response } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import userRoutes from "../modules/user/routes";
import taskRoutes from "../modules/task/routes";
import collectioRoutes from "../modules/collection/routes";
import cors from "cors";

const routes = (app: any) => {
  //Teste de rota base
  app.route("/").get((req: Request, res: Response) => {
    res.status(200).send({ title: "Home page Test Json" });
  });

  //A baixo as rotas
  app
    .use(cors())
    .use(express.json())
    .use("/user", userRoutes)
    .use(ensureAuthenticated)
    .use("/task", taskRoutes)
    .use("/collection", collectioRoutes);
};

export default routes;
