import InvalidEntries from "../../../utils/invalidEntries";
import DeleteUserRepository from "../repositories/delete";


class DeleteUserUseCase {

    static async execute(email: string) {
        await InvalidEntries.userDontExists(email);

        const user = DeleteUserRepository.delete(email);
        return user;
    }

}

export default DeleteUserUseCase;