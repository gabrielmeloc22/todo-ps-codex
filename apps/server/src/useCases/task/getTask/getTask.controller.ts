import { Request, Response } from "express";
import  getTaskUseCase from "./getTask.useCase";

class getTaskController {

    constructor(private getTaskUseCase: getTaskUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
            const { id } = request.params;

            const task = await this.getTaskUseCase.execute(id);

            return response.status(200).json(task); 
    }   
}