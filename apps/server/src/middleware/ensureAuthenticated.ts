import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";
import HttpError from "../utils/HttpError";

const getToken = () => {
  const TOKEN = process.env.ACCESS_TOKEN_SECRET;
  const jwtToken = new TextEncoder().encode(TOKEN);
  return jwtToken;
}

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

  const { payload, protectedHeader } = await jwtVerify(token, getToken(), {
    issuer: 'urn:example:issuer',
    audience: 'urn:example:audience',
  })

  const { userId } = payload as {userId:string};

  request.headers.userId = userId;

  next();
}
