import { Prisma, Task } from "@prisma/client";
import prisma from "../../../db";

class CreateTaskRepository {
  static async create({
    title,
    content,
    completionDate,
    status,
    authorId,
    collectionId,
  }: Prisma.TaskUncheckedCreateInput): Promise<Task> {
    const newTask = await prisma.task.create({
      data: {
        title,
        content,
        status,
        authorId,
        collectionId,
        completionDate,
      },
    });
    return newTask;
  }
}

export default CreateTaskRepository;
