import taskRepository from "../../../repositories/implementations/task.repository";
import ITaskRepository from "../../../repositories/interfaces/task.repository.interface";

class DeleteTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    private static instance: DeleteTaskUseCase;

    public static getInstance(): DeleteTaskUseCase {
        if(!DeleteTaskUseCase.instance) {
            DeleteTaskUseCase.instance = new DeleteTaskUseCase(taskRepository.getInstance());
        }
        return DeleteTaskUseCase.instance;
    }


    async execute(id: string) {
        const task = this.taskRepository.deleteTask(id);
        return task;
    }
}

export default DeleteTaskUseCase