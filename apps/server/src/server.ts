import { PrismaClient, Prisma } from "@prisma/client";
import app from "./app";

require("dotenv").config();

//Mover posteriormente
const prisma = new PrismaClient();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server ready at: http://localhost:${PORT}`));

export { prisma }
