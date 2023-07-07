import prisma from "../../../db";

class DeleteTaskUseCase {
  static async execute(id: string) {
    const task = await prisma.task.delete({
      where: {
        id: id,
      },
    });
    return task;
  }
}

export default DeleteTaskUseCase;
