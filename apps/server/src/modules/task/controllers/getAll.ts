import { Request, Response } from "express";
import GetAllTasksUseCase from "../useCases/getAll";
import CheckUser from "../../../utils/checkUser";

class GetAllTasksController {
    
    static async handle(request: Request, response: Response) {
        const { authorId } = request.params;

        const tokenUserId = request.headers.userId as string;

        CheckUser.check(tokenUserId, authorId);

        const allTasks = await GetAllTasksUseCase.execute(authorId);

        return response.status(200).json(allTasks)

    }

}

export default GetAllTasksController;