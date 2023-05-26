import { Prisma, Task } from '@prisma/client'
import GetTaskRepository from '../repositories/get'

class GetAllTasksUseCase {
    
    static async execute(authorId: string, orderBy: Prisma.SortOrder) {

        const allTasks: Task[] = await GetTaskRepository.getAll(authorId, orderBy);
        return allTasks;
        
    }
}

export default GetAllTasksUseCase;