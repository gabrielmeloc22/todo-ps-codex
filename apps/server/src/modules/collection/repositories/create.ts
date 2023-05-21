import { Collection } from "@prisma/client";
import prisma from "../../../middleware/prisma/client";

type CollectionInput = Omit<Collection, "id" | "createdAt" | "updatedAt">;

class CreateCollectionRepository {

    static async create(collection: CollectionInput): Promise<Collection> {
        const newCollection = prisma.collection.create({
            data: {
                title: collection.title,
                color: collection.color,
                authorId: collection.authorId,
            },
        });
        
        return newCollection;

    }

}

export default CreateCollectionRepository;