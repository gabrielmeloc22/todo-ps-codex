import { Collection } from "@prisma/client";
import prisma from "../../../middleware/prisma/client";

class UpdateCollectionRepository {
    static async upadate(idx: string, fieldName:string, fieldData: string | Date): Promise<Collection> {
        const updateCollection =  await prisma.collection.update({
            where: {
                id: idx
            },
            data: {
                [fieldName]: fieldData
            },
        });
        return updateCollection
    }
}

export default UpdateCollectionRepository