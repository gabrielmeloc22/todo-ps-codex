import Collection from "../../../models/Collection";
import CollectionRepository from "../../../repositories/implementations/collection.repository";
import ICollectionRepository from "../../../repositories/interfaces/collection.repository.interface";

class CreateCollectionUseCase {
    constructor(private collectionRepository: ICollectionRepository) {}

    private static instance: CreateCollectionUseCase;

    public static getInstance(): CreateCollectionUseCase {
        if (!CreateCollectionUseCase.instance) {
            CreateCollectionUseCase.instance = new CreateCollectionUseCase(CollectionRepository.getInstance());
        }
        return CreateCollectionUseCase.instance;
    }


    async execute({title, color, authorId, tasks}: Collection) {
        const collection = await this.collectionRepository.createCollection({
            title,
            color,
            authorId,
            tasks
        });
        return collection;
    }
}

export default CreateCollectionUseCase;