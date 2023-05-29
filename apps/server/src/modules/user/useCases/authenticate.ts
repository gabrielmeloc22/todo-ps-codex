import prisma from "../../../middleware/prisma/client";
import HttpError from "../../../utils/HttpError";
import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { SignJWT } from "jose";

class AuthenticateUserUseCase {
  static async UserAlreadyExists(email: string): Promise<User> {
    const User = await prisma.user.findFirst({ where: { email } });

    if (!User) {
      throw new HttpError("Não existe usuário com o email passado!", 401);
    }

    return User;
  }

  static async passwordMatch(User: User, password: string) {
    const passwordMatch = await compare(password, User.password);

    if (!passwordMatch) {
      throw new HttpError("Senha ou Email incorretas", 401);
    }
  }

  static getToken() {
    const TOKEN = process.env.ACCESS_TOKEN_SECRET;
    const jwtToken = new TextEncoder().encode(TOKEN);
    return jwtToken;
  }

  static async execute({ email, password }: Pick<User, "email" | "password">) {
    const user = await this.UserAlreadyExists(email);
    await this.passwordMatch(user, password);

    const alg = 'HS256'

    const token = await new SignJWT({ 'urn:example:claim': true, userId: user.id })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('5d')
    .sign(this.getToken())

    const { password: _, ...User } = user;
    return { token, User };
  }
}

export default AuthenticateUserUseCase;
