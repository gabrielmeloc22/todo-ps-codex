import { Request, Response } from "express";
import UpdateUserUseCase from "../useCases/update";
import CheckUser from "../../../utils/checkUser";

class UpdateUserController {
  static async handle(request: Request, response: Response) {
    const { userId } = request.params;
    const data = request.body;
    const tokenUserId = request.headers.userId as string;

    CheckUser.check(tokenUserId, userId);

    const updatedUser = await UpdateUserUseCase.excute(userId, data);

    return response.status(200).json(updatedUser);
  }
}

export default UpdateUserController;
