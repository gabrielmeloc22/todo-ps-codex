import { Prisma } from "@prisma/client";
import prisma from "../../../db";


class UpdateUserUseCase {
  static async execute(id: string, data: Prisma.UserUpdateInput) {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data,
    });
    return updatedUser;
  }
}

export default UpdateUserUseCase;
