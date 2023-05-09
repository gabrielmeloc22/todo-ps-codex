import User from './User';
import Collection from './Collection';


interface ITaskDTO {
    title: string;
    content: string | null;
    status: boolean ;
    authorId: string;
    collectionId: string | null; 
}

class Task {
    
    title: string;
    content: string | null;
    status: boolean ;
    authorId: string;
    collectionId: string | null; 


    constructor ({title, content, status, authorId, collectionId}: ITaskDTO) {
        this.title = title;
        this.content = content;
        this.status = status;
        this.authorId = authorId;
        this.collectionId = collectionId;
    }
}

export default Task;