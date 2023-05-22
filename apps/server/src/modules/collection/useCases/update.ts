import { Collection } from "@prisma/client";
import UpdateCollectionRepository from "../repositories/update";

class UpdateCollectionUsecase {
    static async execute(id: string, fieldName: string, fieldData: string | Date) {

        const updateCollection: Collection = await UpdateCollectionRepository.upadate(id, fieldName, fieldData);
        return updateCollection;

    }
}

export default UpdateCollectionUsecase;