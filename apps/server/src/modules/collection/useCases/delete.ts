import DeleteCollectionRepository from "../repositories/delete";

class DeleteCollectionUseCase {
  static async execute(id: string) {
    const collection = await DeleteCollectionRepository.delete(id);
    return collection;
  }
}

export default DeleteCollectionUseCase;
