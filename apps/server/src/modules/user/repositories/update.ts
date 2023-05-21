import { User } from "@prisma/client";
import prisma from "../../../middleware/prisma/client";

class UpdateUserRepository {
    static async update(user: User, idx: string): Promise<User> {
        const updatedUser = await prisma.user.update({ 
            where: {
                id: idx
            },
            data: {
                email: user.email,
                password: user.password,
                name: user.name,
                lastName: user.lastName,
                age: user.age,
                gender: user.gender,
            },
        });
        return updatedUser;
    }
}

export default UpdateUserRepository;