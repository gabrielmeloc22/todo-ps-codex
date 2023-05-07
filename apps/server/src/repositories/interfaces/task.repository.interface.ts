import { Task } from "@prisma/client";

interface ITaskRepository {
    getTaskById(id: string): Promise<Task | null>;
    createTask(task: Task): Promise<Task>;
    //updateTask(task: Task): Promise<Task>;
    //deleteTask(id: String): Promise<Task>;
}

export default ITaskRepository;