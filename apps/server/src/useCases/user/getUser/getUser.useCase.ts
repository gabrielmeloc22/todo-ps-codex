import IUserRepository from "../../../repositories/interfaces/user.repository.interface";


class getUserUseCase {

    constructor(private userRepository: IUserRepository) { }

    async execute(id: String) {
        const user = this.userRepository.getUserById(id);
        return user;
    }
}

export default getUserUseCase;