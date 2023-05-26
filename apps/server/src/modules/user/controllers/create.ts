import { Request, Response } from "express";
import CreateUserUseCase from "../useCases/create"
import { User } from "@prisma/client";

type UserInput = Omit<User, "id" | "photoPublicUrl" >;

class createUserController {

    static async handle(request: Request, response: Response): Promise<Response> {
            const { email, password, name, lastName, age, gender }: UserInput = request.body;
        
            const user = await CreateUserUseCase.execute(
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