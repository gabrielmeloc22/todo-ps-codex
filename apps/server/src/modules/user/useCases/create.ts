import { Prisma, User } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt";
import InvalidEntries from "../../../utils/invalidEntries";
import prisma from "../../../db";

type UserInput = Omit<User, "id" | "profilePic">;

class CreateUserUseCase {
  
  static async execute({ email, password, age, gender, name, lastName }: Prisma.UserUncheckedCreateInput) {
    await InvalidEntries.userAlreadyExists(email);

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        lastName,
        age,
        gender,
      },
    });

    return newUser;
  }
}

export default CreateUserUseCase;
