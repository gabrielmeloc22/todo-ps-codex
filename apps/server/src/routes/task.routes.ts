import { Router } from "express";
import createTask from "../useCases/task/createTask";
import getTaskById from "../useCases/task/getTask";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const router = Router();

router
  .post("/", ensureAuthenticated, (request, response) => {
    return createTask.handle(request, response);
  })
  .get("/:id", ensureAuthenticated, (request, response) => {
    return getTaskById.handle(request, response);
  });

export default router;
