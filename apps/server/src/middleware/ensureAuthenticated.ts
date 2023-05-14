import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const getToken = () => {
    const TOKEN = process.env.ACCESS_TOKEN_SECRET;
    return TOKEN;
}

const verifyTokenExists = (request: Request, response: Response, next: NextFunction) => {
    const authToken = request.headers.authorization;

    if(!authToken) {
        throw new Error("Token is missing");
    }

    return authToken;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = verifyTokenExists(request,response,next);

    const token = authToken.split(" ")[1];

    verify(token, getToken());
    return next()
}