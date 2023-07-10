import { Prisma } from "@prisma/client";
import prisma from "../../../db";

class UpdateCollectionUsecase {
  static async execute(id: string, data: Prisma.CollectionUpdateInput) {
    const updatedCollection = await prisma.collection.update({
      where: {
        id,
      },
      data,
    });
    return updatedCollection;
  }
}

export default UpdateCollectionUsecase;
