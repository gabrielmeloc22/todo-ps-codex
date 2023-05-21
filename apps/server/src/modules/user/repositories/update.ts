import { User } from "@prisma/client";
import prisma from "../../../middleware/prisma/client";

class UpdateUserRepository {
    static async update(idx: string, fieldName: string, fieldData: any): Promise<User> {
        const updatedUser = await prisma.user.update({ 
            where: {
                id: idx
            },
            data: {
                [fieldName]: fieldData
            },
        });
        return updatedUser;
    }
}

export default UpdateUserRepository;