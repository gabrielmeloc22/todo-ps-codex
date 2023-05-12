import { Request, Response } from 'express';
import createCollectionUseCase from './createCollection.useCase';
import Collection from '../../../models/Collection';

class CreateCollectionController {
    private static instance: CreateCollectionController;
    

    constructor(private createCollectionUseCase: createCollectionUseCase) {}

    public static getInstance(): CreateCollectionController {
        if (!CreateCollectionController.instance) {
            CreateCollectionController.instance = new CreateCollectionController(createCollectionUseCase.getInstance());
        }
        return CreateCollectionController.instance;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { title, color, authorId, tasks }: Collection = request.body;

        const collection = await this.createCollectionUseCase.execute(
            {
                title: title,
                color: color,
                authorId: authorId,
                tasks: tasks
            }
        );

        return response.status(200).json(collection);
    }
}

export default CreateCollectionController;