import { Task, Prisma } from "@prisma/client";
import UpdateTaskRepository from "../repositories/update";

class UpdateTaskUseCase {
  static async execute(id: string, data: Prisma.TaskUpdateInput) {
    const updateTask: Task = await UpdateTaskRepository.update(id, data);
    return updateTask;
  }
}

export default UpdateTaskUseCase;
