import { Collection } from "@prisma/client";
import prisma from "../../../middleware/prisma/client";

class GetCollectionRepository {

    static async getCollectionById(id: string): Promise<Collection | null> {
        const outputCollection = await prisma.collection.findUnique({
            where: {
                id: id
            },
        });
        
        return outputCollection;
    }
    
}

export default GetCollectionRepository;