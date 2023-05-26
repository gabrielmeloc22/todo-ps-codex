import { Request, Response } from "express";
import GetTaskUseCase from "../useCases/get";
import CheckUser from "../../../utils/checkUser";

class getTaskController {

    static async handle(request: Request, response: Response): Promise<Response> {
            const { taskId, authorId } = request.params;
            
            const tokenUserId = request.headers.userId as string;

            CheckUser.check(tokenUserId, authorId);

            const task = await GetTaskUseCase.execute(taskId);

            return response.status(200).json(task); 
    }   
}

export default getTaskController;