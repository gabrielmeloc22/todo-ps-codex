import { Prisma, Task } from "@prisma/client";
import prisma from "../../../db";

class GetTaskRepository {
  static async get(id: string): Promise<Task | null> {
    const outputTask = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });
    return outputTask;
  }

  static async getAll(authorId: string, orderBy: Prisma.SortOrder): Promise<Task[]> {
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

export default GetTaskRepository;
