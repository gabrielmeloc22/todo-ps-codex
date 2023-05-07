import { Request, Response } from 'express';
import  CreateTaskUseCase from './createTask.useCase';
import { Task } from "@prisma/client"

class createTaskController {
    constructor(private createTaskUseCase: CreateTaskUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { title, authorId, collectionId }: Task = request.body;

        const task = await this.createTaskUseCase.execute(
            {
                title: title,
                authorId: authorId,
                collectionId: collectionId,
            }
        );

        return response.status(201).json(task);
    }
}

export default createTaskController;