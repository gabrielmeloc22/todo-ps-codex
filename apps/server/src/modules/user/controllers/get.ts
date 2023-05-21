import { Request, Response } from "express";
import GetUserUseCase from "../useCases/get";

class getUserController {

    static async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const user = await GetUserUseCase.execute(id)  
        return response.status(200).json(user); 
    }   
}

export default getUserController;