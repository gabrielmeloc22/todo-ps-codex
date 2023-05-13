import { Request, Response, NextFunction } from "express";
import "express-async-errors";

const asyncErrors = (app: any) => {
  app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    response.status(500).json({
      status: "Error",
      message: error.message,
    });
  });
};

export default asyncErrors;
