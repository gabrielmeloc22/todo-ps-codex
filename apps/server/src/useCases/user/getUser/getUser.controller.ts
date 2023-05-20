import { Request, Response } from "express";
import getUserUseCase from "./getUser.useCase";

class getUserController {

    private static instance: getUserController;

    constructor(private getUserUseCase: getUserUseCase) { }

    public static getInstance(): getUserController {
        if (!getUserController.instance) {
            getUserController.instance = new getUserController(getUserUseCase.getInstance());
        }
        return getUserController.instance;
    }


    async handle(request: Request, response: Response): Promise<Response> {
            const { id } = request.params;
            console.log(id);
            const user = await this.getUserUseCase.execute(id);

            return response.status(200).json(user); 
    }   
}

export default getUserController;