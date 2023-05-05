import User from './User';
import Task from "./Task";


interface ICollectionDTO {
    createdAt: Date;
    updatedAt?: Date;
    title: String;
    color: String;
    author: User;
    authorId: String;
    tasks?: Task[];
}
class Collection {

    createdAt: Date;
    updatedAt?: Date;
    title: String;
    color: String;
    author: User; 
    authorId: String;
    tasks?: Task[];

    constructor({createdAt,updatedAt ,title, color, author, authorId, tasks}: ICollectionDTO) {
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.title = title;
        this.color = color;
        this.author = author;
        this.authorId = authorId;
        this.tasks = tasks;
    }
}

export default Collection;