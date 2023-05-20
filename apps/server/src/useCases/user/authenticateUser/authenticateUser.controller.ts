import { Request, Response } from "express";
import AuthenticateUserUseCase from "./authenticateUser.useCase";

class AuthenticateUserController {
  private static instance: AuthenticateUserController;

  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  public static getInstance(): AuthenticateUserController {
    if (!this.instance) {
      this.instance = new AuthenticateUserController(AuthenticateUserUseCase.getInstance());
    }
    return this.instance;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const token = await this.authenticateUserUseCase.execute({
      email: email,
      password: password,
    });

    return response.status(200).json(token);
  }
}

export default AuthenticateUserController;
