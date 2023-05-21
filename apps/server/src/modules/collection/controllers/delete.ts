import { Request, Response } from 'express';
import DeleteCollectionUseCase from '../useCases/delete';

class DeleteCollectionController {
    
    static async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;

        const collection = await DeleteCollectionUseCase.execute(id);

        return response.status(201).json(collection);

    }
    
}

export default DeleteCollectionController;