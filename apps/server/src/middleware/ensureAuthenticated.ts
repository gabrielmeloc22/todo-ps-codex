import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import prisma from "./prisma/client";

const getToken = () => {
    const TOKEN = process.env.ACCESS_TOKEN_SECRET;
    return TOKEN;
}

const verifyTokenExists = (request: Request) => {
    const authToken = request.headers.authorization;

    if(!authToken) {
        throw new Error("Token is missing");
    }

    return authToken;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = verifyTokenExists(request);

    const token = authToken.split(" ")[1];

    const {userId} = verify(token, getToken()) as { userId: string };

    const authorId = request.params.authorId || request.body.authorId;

    if (authorId !== userId) {
      throw new Error("Invalid user id");
    }

    next();
}