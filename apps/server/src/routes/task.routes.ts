import { Router } from "express";
import createTask from "../useCases/task/createTask";
import getTaskById from "../useCases/task/getTask";

const router = Router();

router
.post("/", (req, res) => {
    const task = createTask.handle(req, res);
})
.get("/:id", (req, res) => {
    const task = getTaskById.handle(req, res);
    res.status(200).json(task);
})

export default router;