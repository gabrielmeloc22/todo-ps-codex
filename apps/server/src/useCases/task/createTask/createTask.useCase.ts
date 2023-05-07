import { Task } from "@prisma/client"
import ITaskRepository from "../../../repositories/interfaces/task.repository.interface";


class createTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}
    
    async execute(data: any) {
        const task = await this.taskRepository.createTask(data);
        return task;
    }
}

export default createTaskUseCase;