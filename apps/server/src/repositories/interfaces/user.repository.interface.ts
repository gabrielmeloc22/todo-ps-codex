import User from "../../models/User";

interface IUserRepository { 
    getUserById(id: String): Promise<User | null>;
    getUserByEmail(email: String): Promise<User | null>;
    createUser(user: User): Promise<User | null>;
    updateUser(user: User): Promise<User | null>;
    deleteUser(id: String): Promise<User | null>;
}

export default IUserRepository;