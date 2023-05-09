import User from './User';
import Task from "./Task";


interface ICollectionDTO {

    title: string;
    color: string;
    authorId: string;
    tasks?: Task[];
}
class Collection {

    title: string;
    color: string;
    authorId: string;
    tasks?: Task[];

    constructor({title, color, authorId, tasks}: ICollectionDTO) {

        this.title = title;
        this.color = color;
        this.authorId = authorId;
        this.tasks = tasks;
        
    }
}

export default Collection;