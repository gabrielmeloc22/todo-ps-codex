import express, { Request, Response } from "express";
import userRoutes from "./user.routes";
import taskRoutes from "./task.routes";
import collectioRoutes from "./collection.routes";

const routes = (app: any) => {
  //Teste de rota base
  app.route("/").get((req: Request, res: Response) => {
    res.status(200).send({ title: "Home page Test Json" });
  });

  //A baixo as rotas
  app
  .use(express.json())
  .use("/user", userRoutes)
  .use("/task", taskRoutes)
  .use("/collection", collectioRoutes)
};

export default routes;
