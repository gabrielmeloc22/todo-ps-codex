import { Request, Response } from 'express';
import GetCollectionUseCase from '../useCases/get';
import CheckUser from '../../../utils/checkUser';

class GetCollectionController {
    
    static async handle(request: Request, response: Response): Promise<Response> {
        
        const { collectionId, authorId } = request.params;
        const includeTasks = request.query.includeTasks as String;
        const tokenUserId = request.headers.userId as string;

        CheckUser.check(tokenUserId, authorId);

        const collection = await GetCollectionUseCase.execute(collectionId, !!includeTasks);

        return response.status(200).json(collection);
        
    }
}

export default GetCollectionController;