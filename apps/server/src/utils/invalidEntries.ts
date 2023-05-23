import prisma from "../middleware/prisma/client";
import HttpError from "./HttpError";

class InvalidEntries {

    public static async userAlreadyExists(email: string): Promise<void> {

        const user = await prisma.user.findFirst(
          { where: {
             email 
          } 
          });

        if (user) {

          throw new HttpError("User Already Exists",409);

        }

    }
}

export default InvalidEntries;