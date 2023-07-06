import { Request, Response } from "express";
import DeleteTaskUseCase from "../../../src/modules/task/useCases/delete";
import CheckUser from "../../../src/utils/checkUser";

class DeleteTaskController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { authorId, taskId } = request.params;

    const tokenUserId = request.headers.userId as string;

    CheckUser.check(tokenUserId, authorId);

    const task = await DeleteTaskUseCase.execute(taskId);

    return response.status(201).json(task);
  }
}

export default DeleteTaskController;
