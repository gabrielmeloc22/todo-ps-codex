import { Request, Response } from 'express';
import DeleteCollectionUseCase from './deleteCollection.useCase';

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
        const { id } = request.params;
        console.log(id);
        const collection = await this.deleteCollectionUseCase.execute(id);

        return response.status(201).json(collection);
    }
}

export default DeleteCollectionController;