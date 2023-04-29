import Task from "./Task"
import Collection from "./Collection";


interface IUserDTO {
    email: string;
    password: string;
    name?: string;
    tasks?: Task[];
    collection?: Collection[];
}

class User {

    email: string;
    password: string;
    name?: string;
    tasks?: Task[];
    collection?: Collection[];

    constructor ({email, password, name, tasks, collection}: IUserDTO) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.tasks = tasks;
        this.collection = collection;
    }
}

export default User;