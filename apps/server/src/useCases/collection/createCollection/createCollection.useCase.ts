import Collection from "../../../models/Collection";
import ICollectionRepository from "../../../repositories/interfaces/collection.repository.interface";

class createCollectionUseCase {
    constructor(private collectionRepository: ICollectionRepository) {}


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

export default createCollectionUseCase;