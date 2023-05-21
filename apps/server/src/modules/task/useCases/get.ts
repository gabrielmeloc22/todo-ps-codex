import GetTaskRepository from "../repositories/get";

class getTaskUseCase {

    static async execute(id: string) {
        
        const task = await GetTaskRepository.get(id);
        return task;

    }

}

export default getTaskUseCase;