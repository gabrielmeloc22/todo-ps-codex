import { Request, Response } from "express";
import GetTaskUseCase from "../useCases/get";

class getTaskController {

    static async handle(request: Request, response: Response): Promise<Response> {
            const { id } = request.params;

            const task = await GetTaskUseCase.execute(id);

            return response.status(200).json(task); 
    }   
}

export default getTaskController;