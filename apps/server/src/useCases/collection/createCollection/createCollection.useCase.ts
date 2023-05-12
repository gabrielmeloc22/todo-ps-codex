import Collection from "../../../models/Collection";
import ICollectionRepository from "../../../repositories/interfaces/collection.repository.interface";

class createCollectionUseCase {
    constructor(private collectionRepository: ICollectionRepository) {}


    async execute({title, color, authorId, author, createdAt}: Collection) {
        const collection = await this.collectionRepository.createCollection({
            title,
            color,
            authorId,
            author
        });
        return collection;
    }
}

export default createCollectionUseCase;