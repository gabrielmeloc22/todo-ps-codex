import { Request, Response } from "express";
import GetUserUseCase from "../../../src/modules/user/useCases/get";
import CheckUser from "../../../src/utils/checkUser";

class getUserController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const tokenUserId = request.headers.userId as string;

    CheckUser.check(tokenUserId, userId);

    const user = await GetUserUseCase.execute(userId);
    return response.status(200).json(user);
  }
}

export default getUserController;
