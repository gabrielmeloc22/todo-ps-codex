import { Request, Response } from 'express';
import { Task } from '@prisma/client';
import CreateTaskUseCase from '../useCases/create';

type TaskInput = Omit<Task, "id" | "createdAt" | "updatedAt" > & { completionDate: Date & string };

class createTaskController {
 
    static async handle(request: Request, response: Response): Promise<Response> {

        const { title, authorId, completionDate, content, status, collectionId }: TaskInput = request.body;

        const userID = request.headers.userId as string;

        CreateTaskUseCase.checkUser(userID, authorId);
        
        const task = await CreateTaskUseCase.execute(
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