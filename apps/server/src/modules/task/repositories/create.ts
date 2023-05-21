import { Task } from "@prisma/client";
import prisma from "../../../middleware/prisma/client";

type TaskInput = Omit<Task, "id" | "createdAt" | "updatedAt">;

class CreateTaskRepository {

    static async create({title, content, completionDate ,status, authorId, collectionId }: TaskInput): Promise<Task> {
            
        const newTask = await prisma.task.create({
            data: {
                title,
                content,
                status,
                authorId,
                collectionId,
                completionDate,
            }
        });
        return newTask;
    }

}

export default CreateTaskRepository;