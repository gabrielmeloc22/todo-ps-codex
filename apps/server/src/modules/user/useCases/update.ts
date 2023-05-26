import { User, Prisma } from "@prisma/client"
import UpdateUserRepository from "../repositories/update"
import HttpError from "../../../utils/HttpError";

class UpdateUserUseCase {
    static async excute(id: string, data: Prisma.UserUpdateInput) {

        const updatedUser: User = await UpdateUserRepository.update(id, data)
        return updatedUser;

    }
}

export default UpdateUserUseCase;