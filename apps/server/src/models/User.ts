import Task from "./Task"
import Collection from "./Collection";


interface IUserDTO {
    email: string;
    password: string;
    name: string;
    lastName: string;
    tasks: Task[];
    collection?: Collection[];
}

class User {

    email: string;
    password: string;
    name: string;
    lastName: string;
    tasks?: Task[];
    collection?: Collection[];

    constructor ({email, password, name, lastName}: IUserDTO) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
    }

}

export default User;