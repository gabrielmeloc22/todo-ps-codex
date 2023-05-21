import { User } from "@prisma/client";
import prisma from "../../../middleware/prisma/client";

type UserInput = Omit<User, "id">;

class CreateUserRepository {

    static async create(user: UserInput): Promise<User> {
        const newUser = await prisma.user.create({
            data: {
                email: user.email,
                password: user.password,
                name: user.name,
                lastName: user.lastName,
                age: user.age,
                gender: user.gender,  
            },
        });
        return newUser;
    }

}

export default CreateUserRepository;