import DeleteUserRepository from "../repositories/delete";


class DeleteUserUseCase {

    static async execute(id: string) {
        const user = DeleteUserRepository.delete(id);
        return user;
    }

}

export default DeleteUserUseCase;