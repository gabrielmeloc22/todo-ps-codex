import { Request, Response } from 'express';
import createCollectionUseCase from './createCollection.useCase';
import Collection from '../../../models/Collection';

class CreateCollectionController {
    constructor(private createCollectionUseCase: createCollectionUseCase) {}


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