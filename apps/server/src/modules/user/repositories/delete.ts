import { User } from "@prisma/client";
import prisma from "../../../db";

class DeleteUserRepository {
  static async delete(id: string): Promise<User | null> {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return user;
  }
}

export default DeleteUserRepository;
