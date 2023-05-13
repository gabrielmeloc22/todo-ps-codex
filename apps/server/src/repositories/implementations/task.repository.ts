import ITaskRepository  from "../interfaces/task.repository.interface";
import prisma from "../../middleware/prisma/client";
import TaskModel  from "../../models/Task";
import { Task } from "@prisma/client";


class taskRepository implements ITaskRepository {
    
        private static instance: taskRepository;
    
        private constructor() { }
    
        public static getInstance(): taskRepository { 
            if (!taskRepository.instance) { 
                taskRepository.instance = new taskRepository();
            }
            return taskRepository.instance;
        }
    
        async getTaskById(id: string): Promise<Task | null> {
            const outputTask = await prisma.task.findUnique({
                where: {
                    id: id
                }
            });
            return outputTask;
        }

        async getAllTasks(authorId: string) {
            const allTasks = await prisma.task.findMany({
                where: {
                    authorId: authorId
                }
            })
            return allTasks;
        }

        async createTask({title, content, status, authorId, collectionId}: TaskModel ): Promise<Task> {
            
            const newTask = await prisma.task.create({
                data: {
                    title,
                    content,
                    status,
                    authorId,
                    collectionId
                }
            });
            return newTask;
        }

        async updateTask({id, title, content, status, collectionId}: Task, idx: string): Promise<Task> {
            const updatedTask = await prisma.task.update({
                where: {
                    id: idx
                },
                data: {
                    id,
                    title,
                    content,
                    status,
                    collectionId
                }
            });
            return updatedTask;
        }

        async deleteTask(id: string): Promise<Task> {
            const task = await prisma.task.delete({
                where: {
                    id: id
                }
            });
            return task;
        }
}

export default taskRepository;