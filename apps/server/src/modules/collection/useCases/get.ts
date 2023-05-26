import GetCollectionRepository from "../repositories/get";

class GetCollectionUseCase {
    
    static async execute(id: string, includeTasks: boolean) {

        const collection = GetCollectionRepository.getCollectionById(id, includeTasks);
        return collection;

    }
}

export default GetCollectionUseCase;