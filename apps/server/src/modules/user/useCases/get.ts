import { User } from "@prisma/client";
import HttpError from "../../../utils/HttpError";
import GetUserRepository from "../repositories/get";

class GetUserUseCase {
  static userNull(user: User | null) {
    if (user === null) {
      throw new HttpError("User Not found", 404);
    }
  }

  static async execute(id: string) {
    const user = await GetUserRepository.getById(id);
    GetUserUseCase.userNull(user);
    return user;
  }
}

export default GetUserUseCase;
