import { Request, Response } from "express";
import UpdateUserUseCase from "../useCases/update";

class UpdateUserController {

    static async handle(request: Request, response: Response) {
        const { id } = request.params;
        const data = request.body;

        const updatedUser = await UpdateUserUseCase.excute(id, data );

        return response.status(200).json(updatedUser);

    }
}

export default UpdateUserController;