import CollectionRepository from "../../../repositories/implementations/collection.repository";
import ICollectionRepository from "../../../repositories/interfaces/collection.repository.interface";

class GetCollectionUseCase {
    constructor(private collectionRepository: ICollectionRepository) {}

    private static instance: GetCollectionUseCase;

    public static getInstance(): GetCollectionUseCase {
        if (!GetCollectionUseCase.instance) {
            GetCollectionUseCase.instance = new GetCollectionUseCase(CollectionRepository.getInstance());
        }
        return GetCollectionUseCase.instance;
    }


    async execute(id: string) {
        const collection = this.collectionRepository.getCollectionById(id);
        return collection;
    }
}

export default GetCollectionUseCase;