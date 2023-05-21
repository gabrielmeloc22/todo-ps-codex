import GetCollectionRepository from "../repositories/get";

class GetCollectionUseCase {
    
    static async execute(id: string) {

        const collection = GetCollectionRepository.getCollectionById(id);
        return collection;

    }
}

export default GetCollectionUseCase;