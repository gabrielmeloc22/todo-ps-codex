import { User } from "@prisma/client";
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

  private async UserAlreadyExists(email: string): Promise<User> {
    const User = await prisma.user.findFirst({ where: { email } });

    if (!User) {
      throw new Error("Email or password incorrect");
    }

    return User;
  }

  private async passwordMatch(User: User, password: string) {
    const passwordMatch = await compare(password, User.password);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }

  }

  private getToken() {
    const TOKEN = process.env.ACCESS_TOKEN_SECRET;
    return TOKEN;
  }

  public async execute({ email, password }: Pick<User, "email" | "password">) {

    const user = await this.UserAlreadyExists(email);
    await this.passwordMatch(user, password);

    const token = sign(
      {
      UserId: user.id,
      },
      this.getToken(),
      {
      expiresIn: '5d' 
      });

    const {password: _, ...User } = user;
    return { token, User };

  }
}

export default AuthenticateUserUseCase;
