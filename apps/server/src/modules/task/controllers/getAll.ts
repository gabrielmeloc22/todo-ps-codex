import { Request, Response } from "express";
import GetAllTasksUseCase from "../useCases/getAll";
import CheckUser from "../../../utils/checkUser";
import { Prisma } from "@prisma/client";

class GetAllTasksController {
  static async handle(request: Request, response: Response) {
    const { authorId } = request.params;
    const orderBy = request.query.orderBy as Prisma.SortOrder;
    const tokenUserId = request.headers.userId as string;

    CheckUser.check(tokenUserId, authorId);

    const allTasks = await GetAllTasksUseCase.execute(authorId, orderBy);

    return response.status(200).json(allTasks);
  }
}

export default GetAllTasksController;
