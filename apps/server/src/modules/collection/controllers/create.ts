import { Request, Response } from "express";
import CreateCollectionUseCase from "../useCases/create";
import { Collection } from "@prisma/client";
import CheckUser from "../../../utils/checkUser";

class CreateCollectionController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { title, color, authorId }: Collection = request.body;

    const tokenUserId = request.headers.userId as string;

    CheckUser.check(tokenUserId, authorId);

    const collection = await CreateCollectionUseCase.execute({
      title: title,
      color: color,
      authorId: authorId,
    });

    return response.status(200).json(collection);
  }
}

export default CreateCollectionController;
