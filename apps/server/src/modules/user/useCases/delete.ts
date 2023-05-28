import InvalidEntries from "../../../utils/invalidEntries";
import DeleteUserRepository from "../repositories/delete";


class DeleteUserUseCase {

    static async execute(id: string) {
        await InvalidEntries.userDontExists(id);

        const user = DeleteUserRepository.delete(id);
        return user;
        
    }

}

export default DeleteUserUseCase;