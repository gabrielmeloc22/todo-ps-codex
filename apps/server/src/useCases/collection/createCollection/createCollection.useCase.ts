import { Collection } from "@prisma/client";
import CollectionRepository from "../../../repositories/implementations/collection.repository";
import ICollectionRepository from "../../../repositories/interfaces/collection.repository.interface";

type CollectionInput = Omit<Collection, "id" | "createdAt" | "updatedAt">;

class CreateCollectionUseCase {
    constructor(private collectionRepository: ICollectionRepository) {}

    private static instance: CreateCollectionUseCase;

    public static getInstance(): CreateCollectionUseCase {
        if (!CreateCollectionUseCase.instance) {
            CreateCollectionUseCase.instance = new CreateCollectionUseCase(CollectionRepository.getInstance());
        }
        return CreateCollectionUseCase.instance;
    }


    async execute({title, color, authorId}: CollectionInput) {
        const collection = await this.collectionRepository.createCollection({
            title,
            color,
            authorId,
        });
        return collection;
    }
}

export default CreateCollectionUseCase;