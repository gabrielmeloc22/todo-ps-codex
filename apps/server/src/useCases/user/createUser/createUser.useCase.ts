import IUserRepository from "../../../repositories/interfaces/user.repository.interface";
import userRepository from "../../../repositories/implementations/user.repository";
import User from "../../../models/User";
import { genSaltSync, hashSync } from "bcrypt";

class createUserUseCase {
  private static instance: createUserUseCase;

  constructor(private userRepository: IUserRepository) {}

  public static getInstance(): createUserUseCase {
    if (!createUserUseCase.instance) {
      createUserUseCase.instance = new createUserUseCase(userRepository.getInstance());
    }
    return createUserUseCase.instance;
  }

  async execute({ email, password, name }: User) {
    const salt = genSaltSync(10)
    const hashedPassword = hashSync(password, salt);

    const result = this.userRepository.createUser({
      email: email,
      password: hashedPassword,
      name: name,
    });
    return result;
  }
}

export default createUserUseCase;
