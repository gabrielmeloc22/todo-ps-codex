import { Request, Response } from "express";
import DeleteUserUseCase from "../useCases/delete";
import CheckUser from "../../../utils/checkUser";

class DeleteUserController {

    static async handle(request: Request, response: Response): Promise<Response> {
        const { userId } = request.params;
        const { email } = request.body;
        const tokenUserId = request.headers.userId as string;

        CheckUser.check(tokenUserId, userId);
        
        const user = await DeleteUserUseCase.execute(email);

        return response.status(201).json(user);
    }
}

export default DeleteUserController;