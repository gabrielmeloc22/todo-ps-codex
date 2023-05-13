import TaskRepository from "../../../repositories/implementations/task.repository";
import ITaskRepository from "../../../repositories/interfaces/task.repository.interface";
import Task from "../../../models/Task";


class GetAllTasksUseCase {
    private static instance: GetAllTasksUseCase

    constructor(private taskRepository: TaskRepository ) {}

    public static getInstance(): GetAllTasksUseCase {
        if (!this.instance) {
          this.instance = new GetAllTasksUseCase(TaskRepository.getInstance());
        }
        return this.instance;
      }

    async execute(authorId: string) {
        const allTasks: Task[] = await this.taskRepository.getAllTasks(authorId);

        return allTasks;
    }
}

export default GetAllTasksUseCase;