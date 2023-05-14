import { Request, Response } from "express";
import DeleteUserUseCase from "./deleteUser.useCase";

class DeleteUserController {
    private static instance: DeleteUserController;


    constructor(private deleteUserUseCase: DeleteUserUseCase) {}

    public static getInstance(): DeleteUserController {
        if(!DeleteUserController.instance) {
            DeleteUserController.instance =  new DeleteUserController(DeleteUserUseCase.getInstance());
        }
        return DeleteUserController.instance;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const user = await this.deleteUserUseCase.execute(id);

        return response.status(201).json(user);
    }
}

export default DeleteUserController;