import { Request, Response } from "express";
import createUserUseCase from "./createUser.useCase"
import { User } from "@prisma/client";

type UserInput = Omit<User, "id">;

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
            const { email, password, name, lastName, age, gender }: UserInput = request.body;
        
            const user = await this.createUserUseCase.execute(
                {
                    email,
                    password,
                    name,
                    lastName,
                    age,
                    gender,
                }
            )
            return response.status(201).json(user); 
    }   
}

export default createUserController;