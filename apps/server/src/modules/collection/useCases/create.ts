import { Collection } from "@prisma/client";
import CreateCollectionRepository from "../repositories/create";

type CollectionInput = Omit<Collection, "id" | "createdAt" | "updatedAt">;

class CreateCollectionUseCase {
  static async execute({ title, color, authorId }: CollectionInput) {
    const collection = await CreateCollectionRepository.create({
      title,
      color,
      authorId,
    });
    return collection;
  }
}

export default CreateCollectionUseCase;
