import { User, Prisma } from "@prisma/client";
import prisma from "../../../middleware/prisma/client";

class UpdateUserRepository {
  static async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data,
    });
    return updatedUser;
  }
}

export default UpdateUserRepository;
