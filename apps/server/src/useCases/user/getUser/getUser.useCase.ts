import IUserRepository from "../../../repositories/interfaces/user.repository.interface";
import UserRepository from "../../../repositories/implementations/user.repository";

class getUserUseCase {
    private static instance: getUserUseCase;

    constructor(private userRepository: IUserRepository) { }

    public static getInstance(): getUserUseCase {
        if (!getUserUseCase.instance) {
            getUserUseCase.instance = new getUserUseCase(UserRepository.getInstance());
        }
        return getUserUseCase.instance;
    }

    async execute(id: String) {
        const user = this.userRepository.getUserById(id);
        return user;
    }
}

export default getUserUseCase;