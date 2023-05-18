import User from './User';
import Collection from './Collection';


interface ITaskDTO {
    title: string;
    content: string | null;
    status: boolean ;
    completionDate: string;
    authorId: string;
    collectionId: string | null; 
}

class Task {
        
    title: string;
    content: string | null;
    status: boolean ;
    completionDate: string;
    authorId: string;
    collectionId: string | null; 


    constructor ({title, content, status, completionDate , authorId, collectionId}: ITaskDTO) {
        this.title = title;
        this.content = content;
        this.completionDate = completionDate;
        this.status = status;
        this.authorId = authorId;
        this.collectionId = collectionId;
    }
}

export default Task;