import { Request, Response } from 'express';
import CreateTaskUseCase from './createTask.useCase';
import Task from "../../../models/Task";

class createTaskController {
    constructor(private createTaskUseCase: CreateTaskUseCase) {}

    
    async handle(request: Request, response: Response): Promise<Response> {
        const { title, authorId, content, status, collectionId }: Task = request.body;
        
        const task = await this.createTaskUseCase.execute(
            {
                title: title,
                authorId: authorId,
                content: content,
                status: status,
                collectionId: collectionId
            }
        );

        return response.status(200).json(task);
    }
}

export default createTaskController;