import IUserRepository from "../../../repositories/interfaces/user.repository.interface";
import userRepository from "../../../repositories/implementations/user.repository";
import User from "../../../models/User";
import { genSaltSync, hashSync } from "bcrypt";
import InvalidEntries from "../../../middleware/invalidEntries";

class createUserUseCase {
  private static instance: createUserUseCase;

  constructor(private userRepository: IUserRepository, private invalidEntries: InvalidEntries) {}

  public static getInstance(): createUserUseCase {
    if (!createUserUseCase.instance) {
      createUserUseCase.instance = new createUserUseCase(userRepository.getInstance(), InvalidEntries.getInstance());
    }
    return createUserUseCase.instance;
  }

  async execute({ email, password, name, lastName }: User) {
    await this.invalidEntries.userAlreadyExists(email);

    const salt = genSaltSync(10)
    const hashedPassword = hashSync(password, salt);

    const result = this.userRepository.createUser({
      email: email,
      password: hashedPassword,
      name: name,
      lastName: lastName,
    });

    return result;
  }
}

export default createUserUseCase;
