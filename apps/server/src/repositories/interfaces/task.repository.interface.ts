import { Task } from "@prisma/client";

type TaskInput = Omit<Task, "id" | "createdAt" | "updatedAt">;

interface ITaskRepository {
    getTaskById(id: string): Promise<Task | null>;
    createTask(task: TaskInput): Promise<Task>;
    updateTask(task: Task, idx: string): Promise<Task>;
    deleteTask(id: String): Promise<Task>;
}

export default ITaskRepository;