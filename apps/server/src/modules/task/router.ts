
import { router } from "../../trpc";
import { createTaskController } from "./procedures/create";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { getAllTasksController, getTaskController } from "./procedures/get";
import { deleteTaskController } from "./procedures/delete";
import { updateTaskController } from "./procedures/update";

export type TaskRouterInputs = inferRouterInputs<typeof taskRouter>;
export type TaskRouterOutputs = inferRouterOutputs<typeof taskRouter>;

export const taskRouter = router({
  createTask: createTaskController,
  getTask: getTaskController,
  getAllTasks : getAllTasksController,
  deleteTask: deleteTaskController,
  updateTask: updateTaskController
});
