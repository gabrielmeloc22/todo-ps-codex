import prisma from "../db";
import HttpError from "./HttpError";

class InvalidEntries {
  public static async userAlreadyExists(email: string): Promise<void> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      throw new HttpError("Usuário já cadastrado", 409);
    }
  }

  public static async userDontExists(id: string): Promise<void> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpError("Usuário não existe", 402);
    }
  }
}

export default InvalidEntries;
