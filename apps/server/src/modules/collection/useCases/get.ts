import prisma from "../../../db";

class GetCollectionUseCase {
  static async execute(id: string, includeTasks: boolean) {
    const outputCollection = await prisma.collection.findUnique({
      where: {
        id: id,
      },
      include: {
        tasks: includeTasks,
      },
    });
    return outputCollection;
  }
}

export default GetCollectionUseCase;
