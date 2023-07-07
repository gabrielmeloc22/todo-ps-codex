import prisma from "../../../db";
import InvalidEntries from "../../../utils/invalidEntries";

class DeleteUserUseCase {
  static async execute(id: string) {
    await InvalidEntries.userDontExists(id);

    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    return user;
  }
}

export default DeleteUserUseCase;
