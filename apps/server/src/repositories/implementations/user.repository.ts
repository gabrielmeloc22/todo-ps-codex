import IUserRepository from "../interfaces/user.repository.interface";
import { prisma } from "../../server";
import { User } from "@prisma/client";


class userRepository implements IUserRepository {

    private static instance: userRepository;

    private constructor() { }

    public static getInstance(): userRepository { 
        if (!userRepository.instance) { 
            userRepository.instance = new userRepository();
        }
        return userRepository.instance;
    }

    async getUserById(id: string): Promise<User | null> {
       const outputUser = await prisma.user.findUnique({
            where: {
                id: id
            },
        });

        return outputUser;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const outputUser = await prisma.user.findUnique({
            where: {
                email: email
            },
        });
        
        return outputUser;
    }

    createUser(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    updateUser(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    
    async deleteUser(id: string): Promise<User | null > {
        const user = await this.getUserById(id);

        if (user != null) {
            await prisma.user.delete({
                where: {
                    id: id
                },
            });

            return user;
        }

        return null;
    }

}