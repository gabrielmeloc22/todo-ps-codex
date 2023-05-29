import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import HttpError from "../utils/HttpError";

const getTokenSecret = () => {
  const TOKEN = process.env.ACCESS_TOKEN_SECRET;

  return TOKEN;
};

const verifyTokenExists = (request: Request) => {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new HttpError("Token não enviado", 401);
  }

  return authToken;
};

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = verifyTokenExists(request);

  const token = authToken.split(" ")[1];

  const { userId } = verify(token, getTokenSecret()) as { userId: string };

  request.headers.userId = userId;

  next();
}
