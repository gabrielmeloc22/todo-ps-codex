import Task from "./Task"
import Collection from "./Collection";


interface IUserDTO {
    email: string;
    password: string;
    name: string;
    tasks: Task[];
    collection?: Collection[];
}

class User {

    email: string;
    password: string;
    name: string;
    tasks?: Task[];
    collection?: Collection[];

    constructor ({email, password, name}: IUserDTO) {
        this.email = email;
        this.password = password;
        this.name = name;
    }

}

export default User;