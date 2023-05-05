import IUserRepository from "../interfaces/user.repository.interface";
import User from "../../models/User";

class userRepository implements IUserRepository {

    private static instance: userRepository;

    private constructor() { }

    public static getInstance(): userRepository { 
        if (!userRepository.instance) { 
            userRepository.instance = new userRepository();
        }
        return userRepository.instance;
    }

    getUserById(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    createUser(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    updateUser(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
}