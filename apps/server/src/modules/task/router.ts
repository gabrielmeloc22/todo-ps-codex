
import { router } from "../../trpc";
import { createTask } from "./procedures/create";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { getAllTasks, getTask } from "./procedures/get";
import { deleteTask } from "./procedures/delete";
import { updateTask } from "./procedures/update";

export type TaskRouterInputs = inferRouterInputs<typeof taskRouter>;
export type TaskRouterOutputs = inferRouterOutputs<typeof taskRouter>;

export const taskRouter = router({
  createTask: createTask,
  getTask: getTask,
  getAllTasks : getAllTasks,
  deleteTask: deleteTask,
  updateTask: updateTask
});
