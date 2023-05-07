import { Request, Response } from "express";
import createUserUseCase from "./createUser.useCase"

class createUserController {

    constructor(private createUserUseCase: createUserUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
            const { data } = request.body;

            const user = await this.createUserUseCase.execute(data);

            return response.status(200).json(user); 
    }   
}

export default createUserController;