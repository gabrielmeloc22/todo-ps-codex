import { Collection } from "@prisma/client";
import prisma from "../../../middleware/prisma/client";

class DeleteCollectionRepository {

    static async delete(id: string): Promise<Collection> {
        const collection =  await prisma.collection.delete({
            where: {
                id: id
            },
        });

        return collection;
    }

}

export default DeleteCollectionRepository;