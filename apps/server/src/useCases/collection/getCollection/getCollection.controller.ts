import { Request, Response } from 'express';
import GetCollectionUseCase from './getCollection.useCase';

class GetCollectionController {
    private static instance: GetCollectionController;
    

    constructor(private GetCollectionUseCase: GetCollectionUseCase) {}

    public static getInstance(): GetCollectionController {
        if (!GetCollectionController.instance) {
            GetCollectionController.instance = new GetCollectionController(GetCollectionUseCase.getInstance());
        }
        return GetCollectionController.instance;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        console.log(id);
        const collection = await this.GetCollectionUseCase.execute(id);

        return response.status(200).json(collection);
    }
}

export default GetCollectionController;