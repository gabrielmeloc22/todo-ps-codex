import TaskRepository from "../../../repositories/implementations/task.repository";

class GetAllTasksUseCase {
    private static instance: GetAllTasksUseCase

    constructor(private taskRepository: TaskRepository ) {}

    public static getInstance(): GetAllTasksUseCase {
        if (!this.instance) {
          this.instance = new GetAllTasksUseCase(TaskRepository.getInstance());
        }
        return this.instance;
      }

    execute() {
        
    }
}

export default GetAllTasksUseCase;