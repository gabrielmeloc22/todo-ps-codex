import { Request, Response } from "express";
import UpdateCollectionUsecase from "../useCases/update";

class UpdateCollectionController {
    static async handle(request: Request, response: Response) {
        const { id } = request.params;
        const data = request.body;
      
        const updateCollection = await UpdateCollectionUsecase.execute(id, data);

        return response.status(200).json(updateCollection);

    }
}

export default UpdateCollectionController;