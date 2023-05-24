import { User } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt";
import InvalidEntries from "../../../utils/invalidEntries";
import CreateUserRepository from "../repositories/create";

type UserInput = Omit<User, "id">;

class createUserUseCase {

  constructor() {}

  static async execute({ email, password, age, gender, name, lastName }: UserInput) {
    await InvalidEntries.userAlreadyExists(email);

    const salt = genSaltSync(10)
    const hashedPassword = hashSync(password, salt);

    const result = CreateUserRepository.create({
      email,
      password: hashedPassword,
      name,
      lastName,
      age,
      gender,
    });

    return result;
  }
}

export default createUserUseCase;
