import prisma from "../../../db";

class DeleteCollectionUseCase {
  static async execute(id: string) {
    const collection = await prisma.collection.delete({
      where: {
        id,
      },
    });
    return collection;
  }
}

export default DeleteCollectionUseCase;
