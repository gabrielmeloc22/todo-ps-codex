import { Task } from "@prisma/client";
import prisma from "../../../middleware/prisma/client";

class DeleteTaskRepository {

    static async delete(id: string): Promise<Task> {
        const task = await prisma.task.delete({
            where: {
                id: id
            }
        });
        return task;
    }
    
}

export default DeleteTaskRepository;