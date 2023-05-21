import { Task } from "@prisma/client";
import CreateTaskRepository from "../repositories/create";

type TaskInput = Omit<Task, "id" | "createdAt" | "updatedAt"> & { completionDate: string };

class createTaskUseCase {
    
    static checkUser (userId: string, authorId: string) {
        if (userId !== authorId) {
            throw new Error("You can't create a task for another user");
        }
    }

    static dateToString(stringDate: string):Date | null {
        if (stringDate === "") {
            return null;
        }
        const date = new Date(stringDate);
        return date;
    }
    
    static async execute({title, content, completionDate, status, authorId, collectionId}: TaskInput) {
        const task = await CreateTaskRepository.create({
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