import { Request, Response } from "express";
import UpdateTaskUseCase from "../useCases/update";

class UpdateTaskController {

    static async handle(request: Request, response: Response) {
        const { taskId } = request.params;
        const { fieldName, fieldData } = request.body;

        const updateTask = await UpdateTaskUseCase.execute(taskId, fieldName, fieldData);

        return response.status(200).json(updateTask);
        
    }
}

export default UpdateTaskController;