import { Task, Prisma } from "@prisma/client";
import prisma from "../../../db";

class UpdateTaskRepository {
  static async update(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
    const updateTask = await prisma.task.update({
      where: {
        id,
      },
      data,
    });
    return updateTask;
  }
}

export default UpdateTaskRepository;
