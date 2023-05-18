import { Request, Response } from "express";
import createUserUseCase from "./createUser.useCase"

class createUserController {

    private static instance: createUserController;

    private constructor(private createUserUseCase: createUserUseCase) { }


    public static getInstance(): createUserController {
        if (!createUserController.instance) {
            createUserController.instance = new createUserController(createUserUseCase.getInstance());
        }
        return createUserController.instance;
    }

    async handle(request: Request, response: Response): Promise<Response> {
            const { email, password, name, lastName, age, gender } = request.body;
        
            const user = await this.createUserUseCase.execute(
                {
                    email: email,
                    password: password,
                    name: name,
                    lastName: lastName,
                    age: age,
                    gender: gender,
                }
            )
            return response.status(200).json(user); 
    }   
}

export default createUserController;