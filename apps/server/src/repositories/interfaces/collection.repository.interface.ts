import { Collection } from "@prisma/client"

type CollectionInput = Omit<Collection, "id" | "createdAt" | "updatedAt">;

interface ICollectionRepository {
    getCollectionById(authorId: string): Promise<Collection | null>;
    createCollection(collection: CollectionInput): Promise<Collection>;
    updateCollection(collection: Collection, authorId: string): Promise<Collection>;
    deleteCollection(authorId: string): Promise<Collection>;
}

export default ICollectionRepository;