import { Collection } from "@prisma/client";
import prisma from "../../../db";

class GetCollectionRepository {
  static async getCollectionById(id: string, includeTasks: boolean): Promise<Collection | null> {
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

export default GetCollectionRepository;
