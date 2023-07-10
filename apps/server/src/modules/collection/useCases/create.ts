import { Prisma } from "@prisma/client";
import prisma from "../../../db";

class CreateCollectionUseCase {
  static async execute({ title, color, authorId }: Prisma.CollectionUncheckedCreateInput) {
    const newCollection = prisma.collection.create({
      data: {
        title,
        color,
        authorId,
      },
    });
    return newCollection;
  }
}

export default CreateCollectionUseCase;
