import { Request, Response } from "express";
import DeleteTaskUseCase from "./deleteTask.useCase";

class DeleteTaskController {
    private static instance: DeleteTaskController;

     
    constructor(private deleteTaskUseCase: DeleteTaskUseCase) {}

    public static getInstance(): DeleteTaskController {
        if(!DeleteTaskController.instance) {
            DeleteTaskController.instance = new DeleteTaskController(DeleteTaskUseCase.getInstance());
        }
        return DeleteTaskController.instance;
    }


    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const task =  await this.deleteTaskUseCase.execute(id);

        return response.status(201).json(task);
    }
}

export default DeleteTaskController;