import userRepository from "../../../repositories/implementations/user.repository";
import IUserRepository from "../../../repositories/interfaces/user.repository.interface";

class DeleteUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    private static instance: DeleteUserUseCase;

    public static getInstance(): DeleteUserUseCase {
        if(!DeleteUserUseCase.instance) {
            DeleteUserUseCase.instance = new DeleteUserUseCase(userRepository.getInstance());
        }
        return DeleteUserUseCase.instance;
    }


    async execute(id: string) {
        const user = this.userRepository.deleteUser(id);
        return user;
    }
}

export default DeleteUserUseCase;