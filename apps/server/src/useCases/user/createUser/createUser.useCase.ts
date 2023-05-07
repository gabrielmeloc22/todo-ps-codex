import IUserRepository from "../../../repositories/interfaces/user.repository.interface";


class createUserUseCase {

    constructor(private userRepository: IUserRepository) { }

    async execute(data: any) {
        const user = this.userRepository.createUser(data);
        return user;
    }

}

export default createUserUseCase;