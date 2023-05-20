import { Router } from "express";
import createTask from "../useCases/task/createTask";
import getTaskById from "../useCases/task/getTask";
import getAllTasks from "../useCases/task/getAllTasks";
import deleteTask from "../useCases/task/deleteTask";

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
