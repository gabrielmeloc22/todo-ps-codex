import IUserRepository from "../interfaces/user.repository.interface";
import prisma from "../../middleware/prisma/client";
import { User } from "@prisma/client";

type UserInput = Omit<User, "id">;

class UserRepository implements IUserRepository {

    private static instance: UserRepository;

    private constructor() { }

    public static getInstance(): UserRepository { 
        if (!UserRepository.instance) { 
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
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

    async createUser(user: UserInput): Promise<User> {
        const newUser = prisma.user.create({
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

    async updateUser(user: User, idx: string): Promise<User> {
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
    
    async deleteUser(id: string): Promise<User | null > {
        const user = await prisma.user.delete({
            where: {
                id: id
            },
        });
        
        return user;
    }
}

export default UserRepository