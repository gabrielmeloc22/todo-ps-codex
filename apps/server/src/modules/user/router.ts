import { router } from "../../trpc";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createUserController } from "./procedures/create";
import { authenticateUserController } from "./procedures/authenticate";
import { getUserController } from "./procedures/get";
import { updateUserController } from "./procedures/update";
import { deleteUserController } from "./procedures/delete";

export type UserRouterInputs = inferRouterInputs<typeof userRouter>;
export type UserRouterOutputs = inferRouterOutputs<typeof userRouter>;

export const userRouter = router({
  createUser: createUserController,
  authenticateUser: authenticateUserController,
  getUser: getUserController,
  deleteUser: deleteUserController,
  updateUser: updateUserController,
});
