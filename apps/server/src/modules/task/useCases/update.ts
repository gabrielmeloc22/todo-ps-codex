import { Task } from "@prisma/client";
import UpdateTaskRepository from "../repositories/update";

class UpdateTaskUseCase {
    static async execute(id: string, fieldName: string, fieldData: string | Date | Boolean) {

        const updateTask: Task = await UpdateTaskRepository.update(id, fieldName, fieldData)
        return updateTask;

    }
}

export default UpdateTaskUseCase;