import { Task } from "@prisma/client";
import prisma from "../../../middleware/prisma/client";

class UpdateTaskRepository {

    static async update(idx: string, fieldName: string, fieldData: string | Date | Boolean): Promise<Task> {
        const updateTask = await prisma.task.update({
            where: {
                id: idx
            },
            data: {
                [fieldName]: fieldData
            },
        });
        return updateTask;
    }
}

export default UpdateTaskRepository;