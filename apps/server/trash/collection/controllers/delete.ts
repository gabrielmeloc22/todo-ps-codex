import { Request, Response } from "express";
import DeleteCollectionUseCase from "../../../src/modules/collection/useCases/delete";
import CheckUser from "../../../src/utils/checkUser";

class DeleteCollectionController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { collectionId, authorId } = request.params;
    const tokenUserId = request.headers.userId as string;

    CheckUser.check(tokenUserId, authorId);

    const collection = await DeleteCollectionUseCase.execute(collectionId);

    return response.status(201).json(collection);
  }
}

export default DeleteCollectionController;
