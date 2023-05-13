import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import createTask from "../useCases/task/createTask";
import getTaskById from "../useCases/task/getTask";
import getAllTasks from "../useCases/task/getAllTasks";


const router = Router();

router
  .post("/", ensureAuthenticated, (request, response) => {
    return createTask.handle(request, response);
  })
  .get("/:id", ensureAuthenticated, (request, response) => {
    return getTaskById.handle(request, response);
  })
  .get("/all/:authorId", ensureAuthenticated, (request, response) => {
    return getAllTasks.handle(request, response);
  });

export default router;
