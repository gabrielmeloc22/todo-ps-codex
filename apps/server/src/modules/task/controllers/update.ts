import { Request, Response } from "express";
import UpdateTaskUseCase from "../useCases/update";
import CheckUser from "../../../utils/checkUser";

class UpdateTaskController {
  static async handle(request: Request, response: Response) {
    const { authorId, taskId } = request.params;
    const data = request.body;

    const tokenUserId = request.headers.userId as string;

    CheckUser.check(tokenUserId, authorId);

    const updateTask = await UpdateTaskUseCase.execute(taskId, data);

    return response.status(200).json(updateTask);
  }
}

export default UpdateTaskController;
