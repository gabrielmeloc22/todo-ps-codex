import { Request, Response } from "express";
import getUserUseCase from "./getUser.useCase";

class getUserController {

    constructor(private getUserUseCase: getUserUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
            const { id } = request.params;

            const user = await this.getUserUseCase.execute(id);

            return response.status(200).json(user); 
    }   
}

export default getUserController;