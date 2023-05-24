import { Collection, Prisma } from "@prisma/client";
import UpdateCollectionRepository from "../repositories/update";

class UpdateCollectionUsecase {
    static async execute(id: string, data: Prisma.CollectionUpdateInput) {

        const updateCollection: Collection = await UpdateCollectionRepository.upadate(id, data);
        return updateCollection;

    }
}

export default UpdateCollectionUsecase;