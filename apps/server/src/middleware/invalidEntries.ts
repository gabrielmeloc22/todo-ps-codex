import prisma from "./prisma/client";
import { User } from "@prisma/client";

class InvalidEntries {
    private static instance: InvalidEntries;

    constructor() {

    }

    public static getInstance() {
        if (!this.instance) {
            return new InvalidEntries();
        }
        return this.instance;
    }

    public async userAlreadyExists(email: string): Promise<void> {
        const user = await prisma.user.findFirst({ where: { email } });
        if (user) {
          throw new Error("User Already Exists");
        }
      }
}

export default InvalidEntries;