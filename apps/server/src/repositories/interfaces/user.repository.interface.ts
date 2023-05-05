import User from "../../models/User";

interface IUserRepository { 
    getUserById(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    createUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User>;
    deleteUser(id: number): Promise<User>;
}

export default IUserRepository;