import { Request, Response } from 'express';
import GetCollectionUseCase from '../useCases/get';

class GetCollectionController {
    
    static async handle(request: Request, response: Response): Promise<Response> {
        
        const { id } = request.params;

        const collection = await GetCollectionUseCase.execute(id);

        return response.status(200).json(collection);
        
    }
}

export default GetCollectionController;