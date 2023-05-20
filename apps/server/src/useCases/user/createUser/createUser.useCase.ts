import IUserRepository from "../../../repositories/interfaces/user.repository.interface";
import userRepository from "../../../repositories/implementations/user.repository";
import { User } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt";
import InvalidEntries from "../../../middleware/invalidEntries";

type UserInput = Omit<User, "id">;

class createUserUseCase {
  private static instance: createUserUseCase;

  constructor(private userRepository: IUserRepository, private invalidEntries: InvalidEntries) {}

  public static getInstance(): createUserUseCase {
    if (!createUserUseCase.instance) {
      createUserUseCase.instance = new createUserUseCase(userRepository.getInstance(), InvalidEntries.getInstance());
    }
    return createUserUseCase.instance;
  }

  async execute({ email, password, age, gender, name, lastName }: UserInput) {
    await this.invalidEntries.userAlreadyExists(email);

    const salt = genSaltSync(10)
    const hashedPassword = hashSync(password, salt);

    const result = this.userRepository.createUser({
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
