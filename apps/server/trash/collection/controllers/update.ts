import { Request, Response } from "express";
import UpdateCollectionUsecase from "../../../src/modules/collection/useCases/update";
import CheckUser from "../../../src/utils/checkUser";

class UpdateCollectionController {
  static async handle(request: Request, response: Response) {
    const { authorId, collectionId } = request.params;
    const data = request.body;
    const tokenUserId = request.headers.userId as string;

    CheckUser.check(tokenUserId, authorId);

    const updateCollection = await UpdateCollectionUsecase.execute(collectionId, data);

    return response.status(200).json(updateCollection);
  }
}

export default UpdateCollectionController;
