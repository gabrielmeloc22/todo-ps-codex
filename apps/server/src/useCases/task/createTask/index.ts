import TaskRepository from "../../../repositories/implementations/task.repository";
import CreateTaskUseCase from "./createTask.useCase";
import CreateTaskController from "./createTask.controller";

const taskRepository = TaskRepository.getInstance();
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const createTaskController = new CreateTaskController(createTaskUseCase);

export default createTaskController;
