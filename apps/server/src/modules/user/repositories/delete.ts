import { User } from "@prisma/client";
import prisma from "../../../middleware/prisma/client";

class DeleteUserRepository {
    
    static async delete(email: string): Promise<User | null > {
        const user = await prisma.user.delete({
            where: {
                email: email
            },
        });
        
        return user;
    }
    
}

export default DeleteUserRepository;