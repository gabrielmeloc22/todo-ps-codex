import { Request, Response } from "express";
import GetAllTasksUseCase from "../useCases/getAll";

class GetAllTasksController {
    
    static async handle(request: Request, response: Response) {
        const { authorId } = request.params;

        const allTasks = await GetAllTasksUseCase.execute(authorId);

        return response.status(200).json(allTasks)

    }

}

export default GetAllTasksController;