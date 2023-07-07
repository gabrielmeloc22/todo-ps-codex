import { User } from "@prisma/client";
import HttpError from "../../../utils/HttpError";
import prisma from "../../../db";

class GetUserUseCase {
  static userNull(user: User | null) {
    if (user === null) {
      throw new HttpError("User Not found", 404);
    }
  }

  static async execute(id: string) {
    const outputUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    GetUserUseCase.userNull(outputUser);
    return outputUser;
  }
}

export default GetUserUseCase;
