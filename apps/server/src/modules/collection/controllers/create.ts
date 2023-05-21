import { Request, Response } from 'express';
import CreateCollectionUseCase from '../useCases/create';
import { Collection } from '@prisma/client';

class CreateCollectionController {

    static async handle(request: Request, response: Response): Promise<Response> {
        const { title, color, authorId }: Collection = request.body;

        const collection = await CreateCollectionUseCase.execute(
            {
                title: title,
                color: color,
                authorId: authorId,
            }
        );

        return response.status(200).json(collection);
    }
}

export default CreateCollectionController;