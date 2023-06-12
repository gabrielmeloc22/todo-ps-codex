import { Router } from "express";
import { publicProcedure, router } from "../../trpc";
import { Task } from "@prisma/client";
import createTask from "./controllers/create";
import createTaskUseCase from "./useCases/create";
import getTaskById from "./controllers/get";
import getAllTasks from "./controllers/getAll";
import deleteTask from "./controllers/delete";
import updateTask from "./controllers/update";

const TaskRouter = Router();

type TaskInput = Omit<Task, "id" | "createdAt" | "updatedAt"> & { completionDate: string };

router({
  createTask: publicProcedure.query(() => {
    return 
  })
})

TaskRouter
  .post("/", (request, response) => {
    return createTask.handle(request, response);
  })
  .get("/:authorId/:taskId", (request, response) => {
    return getTaskById.handle(request, response);
  })
  .get("/:authorId", (request, response) => {
    return getAllTasks.handle(request, response);
  })
  .put("/:authorId/:taskId", (request, response) => {
    return updateTask.handle(request, response);
  })
  .delete("/:authorId/:taskId", (request, response) => {
    return deleteTask.handle(request, response);
  });



export default TaskRouter;
