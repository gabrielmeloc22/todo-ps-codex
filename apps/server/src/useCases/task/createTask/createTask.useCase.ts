import Task  from "../../../models/Task";
import ITaskRepository from "../../../repositories/interfaces/task.repository.interface";


class createTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}
    
    
    async execute({title, content, status, authorId, collectionId}: Task) {
        const task = await this.taskRepository.createTask({
            title,
            content,
            status,
            authorId,
            collectionId
        });
        return task;
    }
}

export default createTaskUseCase;