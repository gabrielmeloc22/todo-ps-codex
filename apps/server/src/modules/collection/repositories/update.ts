import { Collection, Prisma } from "@prisma/client";
import prisma from "../../../middleware/prisma/client";

class UpdateCollectionRepository {
    static async upadate(id: string, data: Prisma.CollectionUpdateInput): Promise<Collection> {
        const updateCollection =  await prisma.collection.update({
            where: {
                id,
            },
            data,
        });
        return updateCollection
    }
}

export default UpdateCollectionRepository