import CollectionModel from "../../models/Collection"
import { Collection } from "@prisma/client"

interface ICollectionRepository {
    getCollectionById(id: string): Promise<Collection | null>;
    createCollection(collection: CollectionModel): Promise<Collection>;
    updateCollection(collection: Collection, authorId: string): Promise<Collection>;
    deleteCollection(id: string): Promise<Collection>;
}

export default ICollectionRepository;