import Collection from "../../../models/Collection";
import CollectionRepository from "../../../repositories/implementations/collection.repository";
import ICollectionRepository from "../../../repositories/interfaces/collection.repository.interface";

class DeleteCollectionUseCase {
    constructor(private collectionRepository: ICollectionRepository) {}

    private static instance: DeleteCollectionUseCase;

    public static getInstance(): DeleteCollectionUseCase {
        if (!DeleteCollectionUseCase.instance) {
            DeleteCollectionUseCase.instance = new DeleteCollectionUseCase(CollectionRepository.getInstance());
        }
        return DeleteCollectionUseCase.instance;
    }


    async execute(authorId: string) {
        const collection = await this.collectionRepository.deleteCollection(
            authorId,
            );
        return collection;
    }
}

export default DeleteCollectionUseCase;