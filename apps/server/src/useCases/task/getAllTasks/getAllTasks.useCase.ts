import TaskRepository from "../../../repositories/implementations/task.repository";
import { Task } from '@prisma/client'

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