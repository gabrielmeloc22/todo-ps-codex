import User from "../../../models/User";
import { User as user } from "@prisma/client";
import prisma from "../../../middleware/prisma/client";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

class AuthenticateUserUseCase {
  public static instance: AuthenticateUserUseCase;

  constructor() {}

  public static getInstance(): AuthenticateUserUseCase {
    if (!this.instance) {
      this.instance = new AuthenticateUserUseCase();
    }

    return this.instance;
  }

  private async userAlreadyExists(email: string): Promise<user> {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new Error("Email or password incorrect");
    }

    return user;
  }

  private async passwordMatch(user: User, password: string) {
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }
  }

  private getToken() {
    const TOKEN = process.env.ACCESS_TOKEN_SECRET;
    return TOKEN;
  }

  public async execute({ email, password }: Pick<User, "email" | "password">) {
    const user = await this.userAlreadyExists(email);
    await this.passwordMatch(user, password);

    
    const token = sign({}, this.getToken(), {
      subject: user.id,
      expiresIn: "5d",
    });

    return { token, user };
  }
}

export default AuthenticateUserUseCase;
