import { User } from "@prisma/client"
import UpdateUserRepository from "../repositories/update"

class UpdateUserUseCase {
    static async excute(id: string, fieldName: string, fieldData: string | number) {

        const updatedUser: User = await UpdateUserRepository.update(id, fieldName, fieldData)
        return updatedUser;

    }
}

export default UpdateUserUseCase;