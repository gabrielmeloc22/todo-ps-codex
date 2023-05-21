import prisma from "./prisma/client";

class InvalidEntries {

    public static async userAlreadyExists(email: string): Promise<void> {

        const user = await prisma.user.findFirst(
          { where: {
             email 
          } 
          });

        if (user) {

          throw new Error("User Already Exists");

        }

    }
}

export default InvalidEntries;