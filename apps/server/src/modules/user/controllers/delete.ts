import { Request, Response } from "express";
import DeleteUserUseCase from "../useCases/delete";

class DeleteUserController {

    static async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const user = await DeleteUserUseCase.execute(id);

        return response.status(201).json(user);
    }
}

export default DeleteUserController;