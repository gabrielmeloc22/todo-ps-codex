import { Request, Response } from "express";
import UpdateCollectionUsecase from "../useCases/update";

class UpdateCollectionController {
    static async handle(request: Request, response: Response) {
        const { collectionId } = request.params;
        const { fieldName, fieldData } = request.body;

        const updateCollection = await UpdateCollectionUsecase.execute(collectionId, fieldName, fieldData);

        return response.status(200).json(updateCollection);

    }
}

export default UpdateCollectionController;