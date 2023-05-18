import Task from "../../../models/Task";
import ITaskRepository from "../../../repositories/interfaces/task.repository.interface";

class createTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    private dateToString(stringDate: string):Date {
        const date = new Date(stringDate);
        return date;
    }
    
    async execute({title, content, completionDate, status, authorId, collectionId}: Task) {
        const task = await this.taskRepository.createTask({
            title,
            content,
            status,
            completionDate: this.dateToString(completionDate),
            authorId,
            collectionId
        });
        return task;
    }
}

export default createTaskUseCase;