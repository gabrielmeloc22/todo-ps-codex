import ITaskRepository  from "../interfaces/task.repository.interface";
import Task from "../../models/Task";


class TaskRepository implements ITaskRepository {
    
        private static instance: TaskRepository;
    
        private constructor() { }
    
        public static getInstance(): TaskRepository { 
            if (!TaskRepository.instance) { 
                TaskRepository.instance = new TaskRepository();
            }
            return TaskRepository.instance;
        }
    
        getTaskById(id: number): Promise<Task> {
            throw new Error("Method not implemented.");
        }
        createTask(task: Task): Promise<Task> {
            throw new Error("Method not implemented.");
        }
        updateTask(task: Task): Promise<Task> {
            throw new Error("Method not implemented.");
        }
        deleteTask(id: number): Promise<Task> {
            throw new Error("Method not implemented.");
        }
}

export default TaskRepository;