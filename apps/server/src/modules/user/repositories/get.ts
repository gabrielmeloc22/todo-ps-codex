import { User } from "@prisma/client";
import prisma from "../../../middleware/prisma/client";

class GetUserRepository {
    
    static async getById(id: string): Promise<User | null> {
        const outputUser = await prisma.user.findUnique({
             where: {
                 id: id
             },
         });
 
         return outputUser;
    }

    static async getByEmail(email: string): Promise<User | null> {
        const outputUser = await prisma.user.findUnique({
            where: {
                email: email
            },
        });

        return outputUser;
    }

}

export default GetUserRepository;   