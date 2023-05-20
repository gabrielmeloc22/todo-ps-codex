import { Request, Response } from 'express';
import CreateTaskUseCase from './createTask.useCase';
import { Task } from '@prisma/client';

type TaskInput = Omit<Task, "id" | "createdAt" | "updatedAt" > & { completionDate: Date & string };

class createTaskController {
    constructor(private createTaskUseCase: CreateTaskUseCase) {}

    
    async handle(request: Request, response: Response): Promise<Response> {
        const { title, authorId, completionDate, content, status, collectionId }: TaskInput = request.body;
        
        const task = await this.createTaskUseCase.execute(
            {
                title,
                authorId,
                content,
                completionDate,
                status,
                collectionId,
            }
        );

        return response.status(200).json(task);
    }
}

export default createTaskController;