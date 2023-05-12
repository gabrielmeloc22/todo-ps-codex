import ICollectionRepository from "../interfaces/collection.repository.interface";
import prisma from "../../middleware/prisma/client"
import { Collection } from "@prisma/client";


class CollectionRepository implements ICollectionRepository {

    private static instance: CollectionRepository;

    private constructor() { }

    public static getInstance(): CollectionRepository { 
        if (!CollectionRepository.instance) { 
            CollectionRepository.instance = new CollectionRepository();
        }
        return CollectionRepository.instance;
    }

    async getCollectionById(id: string): Promise<Collection | null> {
        const outputCollection = await prisma.collection.findUnique({
            where: {
                id: id
            },
        });
        
        return outputCollection;
    }

    async createCollection(collection: Collection): Promise<Collection> {
        const newCollection = prisma.collection.create({
            data: {
                title: collection.title,
                color: collection.color,
                authorId: collection.authorId,
            },
        });
        
        return newCollection;
    }

    async updateCollection(collection: Collection, id: string): Promise<Collection> {
        const updateCollection = await prisma.collection.update({
            where: {
                id: id,
            },
            data: {
                title: collection.title,
                color: collection.color,
                authorId: collection.authorId,
            },
        });
        
        return updateCollection;
    }

    async deleteCollection(id: string): Promise<Collection> {
        const collection =  await prisma.collection.delete({
            where: {
                id: id
            },
        });

        return collection;
    }
}

export default CollectionRepository;