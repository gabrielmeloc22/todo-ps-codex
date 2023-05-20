import { Task } from "@prisma/client";
import ITaskRepository from "../../../repositories/interfaces/task.repository.interface";

type TaskInput = Omit<Task, "id" | "createdAt" | "updatedAt"> & { completionDate: string };

class createTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    private dateToString(stringDate: string):Date | null {
        if (stringDate === "") {
            return null;
        }
        const date = new Date(stringDate);
        return date;
    }
    
    async execute({title, content, completionDate, status, authorId, collectionId}: TaskInput) {
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