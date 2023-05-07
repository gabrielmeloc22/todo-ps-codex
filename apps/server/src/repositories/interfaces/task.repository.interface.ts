import Task  from "../../models/Task";

interface ITaskRepository {
    getTaskById(id: String): Promise<Task>;
    createTask(task: Task): Promise<Task>;
    updateTask(task: Task): Promise<Task>;
    deleteTask(id: String): Promise<Task>;
}

export default ITaskRepository;