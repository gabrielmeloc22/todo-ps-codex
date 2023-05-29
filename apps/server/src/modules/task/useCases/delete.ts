import DeleteTaskRepository from "../repositories/delete";

class DeleteTaskUseCase {
  static async execute(id: string) {
    const task = DeleteTaskRepository.delete(id);
    return task;
  }
}

export default DeleteTaskUseCase;
