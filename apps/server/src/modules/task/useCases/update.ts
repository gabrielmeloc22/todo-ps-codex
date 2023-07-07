import { Prisma } from "@prisma/client";
import prisma from "../../../db";

class UpdateTaskUseCase {
  static async execute(id: string, data: Prisma.TaskUpdateInput) {
    const updateTask = await prisma.task.update({
      where: {
        id,
      },
      data,
    });
    return updateTask;
  }
}

export default UpdateTaskUseCase;
