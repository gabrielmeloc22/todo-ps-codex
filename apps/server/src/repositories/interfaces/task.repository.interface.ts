import TaskModel from "../../models/Task";
import { Task } from "@prisma/client";

interface ITaskRepository {
    getTaskById(id: string): Promise<Task | null>;
    createTask(task: TaskModel): Promise<Task>;
    updateTask(task: Task, idx: string): Promise<Task>;
    deleteTask(id: String): Promise<Task>;
}

export default ITaskRepository;