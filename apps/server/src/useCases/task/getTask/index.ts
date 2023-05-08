import TaskRepository from "../../../repositories/implementations/task.repository";
import GetTaskUseCase from "./getTask.useCase";
import GetTaskController from "./getTask.controller";

const taskRepository = TaskRepository.getInstance();
const getTaskUseCase = new GetTaskUseCase(taskRepository);
const getTaskController = new GetTaskController(getTaskUseCase);

export default getTaskController;