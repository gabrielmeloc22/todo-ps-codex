import Task  from "../../models/Task";

interface ITaskRepository {
    getTaskById(id: number): Promise<Task>;
    createTask(task: Task): Promise<Task>;
    updateTask(task: Task): Promise<Task>;
    deleteTask(id: number): Promise<Task>;
}

export default ITaskRepository;