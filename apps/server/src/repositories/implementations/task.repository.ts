import ITaskRepository  from "../interfaces/task.repository.interface";
import { Task } from "@prisma/client";
import prisma from "../../middleware/prisma/client";


class TaskRepository implements ITaskRepository {
    
        private static instance: TaskRepository;
    
        private constructor() { }
    
        public static getInstance(): TaskRepository { 
            if (!TaskRepository.instance) { 
                TaskRepository.instance = new TaskRepository();
            }
            return TaskRepository.instance;
        }
    
        async getTaskById(id: string): Promise<Task | null> {
            const task = await prisma.task.findUnique({
                where: {
                    id: id
                }
            });
            return task;
        }

        async createTask({id, createdAt, updatedAt, title, content, status, authorId, collectionId}: Task): Promise<Task> {
            
            const newTask = await prisma.task.create({
                data: {
                    id,
                    createdAt,
                    updatedAt,
                    title,
                    content,
                    status,
                    authorId,
                    collectionId
                }
            });
            return newTask;
        }

        //async updateTask(task: Task, idx: string): Promise<Task> {
        //    const updatedTask = await prisma.task.update({
        //        where: {
        //            id: idx
        //        },
        //        data: {
        //            title: task.title,
        //            description: task.description,
        //            status: task.completed,
        //            userId: task.userId,
        //        }
        //    });
        //    return updatedTask;
        //}
//
        //async deleteTask(id: string): Promise<Task> {
        //    const task = await prisma.task.delete({
        //        where: {
        //            id: id
        //        }
        //    });
        //    return task;
        //}
}

export default TaskRepository;