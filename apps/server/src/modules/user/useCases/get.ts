import GetUserRepository from "../repositories/get";

class getUserUseCase {
    
    static async execute(id: string) {
        const user = GetUserRepository.getById(id);
        return user;
    }

}

export default getUserUseCase;