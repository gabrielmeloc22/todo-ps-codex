import { Task } from '@prisma/client'
import GetTaskRepository from '../repositories/get'

class GetAllTasksUseCase {
    
    static async execute(authorId: string) {

        const allTasks: Task[] = await GetTaskRepository.getAll(authorId);
        return allTasks;
        
    }
}

export default GetAllTasksUseCase;