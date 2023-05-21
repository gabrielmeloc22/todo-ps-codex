import { Router } from "express";
import createTask from "./controllers/create";
import getTaskById from "./controllers/get";
import getAllTasks from "./controllers/getAll";
import deleteTask from "./controllers/delete";

const router = Router();

router
  .post("/", (request, response) => {
    return createTask.handle(request, response);
  })
  .get("/:id", (request, response) => {
    return getTaskById.handle(request, response);
  })
  .get("/all/:authorId", (request, response) => {
    return getAllTasks.handle(request, response);
  })
  .delete("/:id", (request, response) => {
    return deleteTask.handle(request, response);
  });

export default router;
