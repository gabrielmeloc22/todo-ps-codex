import { Request, Response } from "express";
import AuthenticateUserUseCase from "../../../src/modules/user/useCases/authenticate";

class AuthenticateUserController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const token = await AuthenticateUserUseCase.execute({
      email: email,
      password: password,
    });

    return response.status(200).json(token);
  }
}

export default AuthenticateUserController;
