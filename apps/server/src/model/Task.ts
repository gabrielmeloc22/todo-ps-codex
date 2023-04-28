import User from './User';
import Collection from './Collection';

interface ITaskDTO {
    title: String;
    description?: String;
    completed: Boolean;
    User?: User;
    Collection?: Collection;  
}

class Task {
    
    title: String;
    description?: String;
    completed: Boolean;
    User?: User;
    Collection?: Collection;


    constructor ({title, description, completed, User, Collection}: ITaskDTO) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.User = User;
        this.Collection = Collection;
    }

}