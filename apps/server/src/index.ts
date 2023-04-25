import { PrismaClient, Prisma } from "@prisma/client";
import { userRoutes } from "./routes/user.routes";
import { taskRoutes } from "./routes/task.routes";
import express from "express";

require("dotenv").config();

const prisma = new PrismaClient();
const app = express();

app
.use(express.json())
.use(userRoutes)
.use(taskRoutes)

const PORT = process.env.PORT || 8080;

app.listen(3001, () =>
  console.log(`
🚀 Server ready at: http://localhost:3001`)
);
