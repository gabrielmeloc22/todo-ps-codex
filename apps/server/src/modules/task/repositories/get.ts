import { Task } from "@prisma/client";
import prisma from "../../../middleware/prisma/client";

class GetTaskRepository {

    static async get(id: string): Promise<Task | null> {
        const outputTask = await prisma.task.findUnique({
            where: {
                id: id
            }
        });
        return outputTask;
    }

    static async getAll(authorId: string): Promise<Task[]> {
        const allTasks = await prisma.task.findMany({
            where: {
                authorId: authorId
            }
        })
        return allTasks;
    }

}

export default GetTaskRepository;