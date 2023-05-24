import { Request, Response } from "express";
import UpdateTaskUseCase from "../useCases/update";

class UpdateTaskController {

    static async handle(request: Request, response: Response) {
        const { id } = request.params;
        const data = request.body;

        const updateTask = await UpdateTaskUseCase.execute(id, data);

        return response.status(200).json(updateTask);
        
    }
}

export default UpdateTaskController;