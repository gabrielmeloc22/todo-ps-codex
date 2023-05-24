import prisma from "../middleware/prisma/client";
import HttpError from "./HttpError";

class InvalidEntries {

  public static async userAlreadyExists(email: string): Promise<void> {

    const user = await prisma.user.findFirst(
      {
        where: {
          email
        }
      });

    if (user) {

      throw new HttpError("Usuário já cadastrado", 409);

    }

  }

  public static async userDontExists(email: string): Promise<void> {
    const user = await prisma.user.findFirst(
      {
        where: {
          email
        }
      });

    if (!user) {

      throw new HttpError("Usuário não existe", 402);

    }
  }
}

export default InvalidEntries;