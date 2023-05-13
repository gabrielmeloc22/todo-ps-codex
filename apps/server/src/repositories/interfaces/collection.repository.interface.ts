import CollectionModel from "../../models/Collection"
import { Collection } from "@prisma/client"

interface ICollectionRepository {
    getCollectionById(authorId: string): Promise<Collection | null>;
    createCollection(collection: CollectionModel): Promise<Collection>;
    updateCollection(collection: Collection, authorId: string): Promise<Collection>;
    deleteCollection(authorId: string): Promise<Collection>;
}

export default ICollectionRepository;