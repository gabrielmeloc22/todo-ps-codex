import asyncErrors from "./middleware/express.async.errors";
import express from "express";
import routes from "./routes";

const app = express();

routes(app);
asyncErrors(app);

export default app;
