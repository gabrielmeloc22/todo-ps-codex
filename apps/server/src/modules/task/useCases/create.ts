import { Prisma } from "@prisma/client";
import prisma from "../../../db";

class CreateTaskUseCase {

  static stringToDate(stringDate: string | undefined | null): Date | null {
    if (stringDate === "" || stringDate === null || stringDate === undefined) {
      return null;
    }
    const date = new Date(stringDate);
    return date;
  }

  static async execute({ title, content, completionDate, status, authorId, collectionId }: Prisma.TaskUncheckedCreateInput) {
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

export default CreateTaskUseCase ;
