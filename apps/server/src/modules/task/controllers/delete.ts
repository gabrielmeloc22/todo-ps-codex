import { Request, Response } from "express";
import DeleteTaskUseCase from "../useCases/delete";

class DeleteTaskController {
    
    static async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const task =  await DeleteTaskUseCase.execute(id);

        return response.status(201).json(task);
    }

}

export default DeleteTaskController;