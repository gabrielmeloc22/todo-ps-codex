import { Request, Response } from "express";
import UpdateUserUseCase from "../useCases/update";

class UpdateUserController {

    static async handle(request: Request, response: Response) {
        const { userId } = request.params;
        const { fieldName, fieldData } = request.body;

        const updatedUser = await UpdateUserUseCase.excute(userId, fieldName, fieldData);

        return response.status(200).json(updatedUser);

    }
}

export default UpdateUserController;