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
    
    public handle(request: Request, response: Response) {
        
    }

}

export default GetAllTasksController;