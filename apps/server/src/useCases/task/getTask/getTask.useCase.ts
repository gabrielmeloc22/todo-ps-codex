import ITaskRepository from "../../../repositories/interfaces/task.repository.interface";

class getTaskUseCase {

    constructor(private taskRepository: ITaskRepository) { }

    async execute(id: string) {
        
        const task = await this.taskRepository.getTaskById(id);

        return task;
    }

}

export default getTaskUseCase;