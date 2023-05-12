import { Request, Response } from 'express';
import DeleteCollectionUseCase from './deleteCollection.useCase';
import Collection from '../../../models/Collection';

class DeleteCollectionController {
    private static instance: DeleteCollectionController;
    

    constructor(private deleteCollectionUseCase: DeleteCollectionUseCase) {}

    public static getInstance(): DeleteCollectionController {
        if (!DeleteCollectionController.instance) {
            DeleteCollectionController.instance = new DeleteCollectionController(DeleteCollectionUseCase.getInstance());
        }
        return DeleteCollectionController.instance;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { title, color, authorId, tasks }: Collection = request.body;

        const collection = await this.deleteCollectionUseCase.execute(
            authorId
        );

        return response.status(200).json(collection);
    }
}

export default DeleteCollectionController;