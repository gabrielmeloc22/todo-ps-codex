import prisma from "../../../db";
import { Prisma } from "@prisma/client";

class GetTaskUseCase {
  static async execute(id: string) {
    const task = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });
    return task;
  }
}

class GetAllTasksUseCase {
  static async execute(authorId: string, orderBy: Prisma.SortOrder) {
    const allTasks = await prisma.task.findMany({
      where: {
        authorId: authorId,
      },
      orderBy: {
        completionDate: orderBy || "asc",
      },
    });
    return allTasks;
  }
}

export { GetTaskUseCase, GetAllTasksUseCase};
