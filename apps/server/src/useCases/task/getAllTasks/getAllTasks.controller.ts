import { Request, Response } from "express";
import GetAllTasksUseCase from "./getAllTasks.useCase";

class GetAllTasksController {
    private static instance: GetAllTasksController;

    constructor(private getAllTasksUseCase: GetAllTasksUseCase) {}

    public static getInstance(): GetAllTasksController {
        if (!this.instance) {
          this.instance = new GetAllTasksController(GetAllTasksUseCase.getInstance());
        }
        return this.instance;
      }
    
    async handle(request: Request, response: Response) {
        const { authorId } = request.params;

        const allTasks = await this.getAllTasksUseCase.execute(authorId);

        return response.status(200).json(allTasks)
    }

}

export default GetAllTasksController;