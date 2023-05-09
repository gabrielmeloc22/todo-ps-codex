import userRepository from "../../../repositories/implementations/user.repository";
import GetUserUseCase from "./getUser.useCase";
import GetUserController from "./getUser.controller";

const userRepo = userRepository.getInstance();
const getUserUseCase = new GetUserUseCase(userRepo);
const getUserController = new GetUserController(getUserUseCase);

export default getUserController;