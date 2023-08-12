import { Request } from "express";
import { middleware } from "../trpc";
import HttpError from "../utils/HttpError";
import { jwtVerify } from "jose";

const getToken = () => {
    const TOKEN = process.env.ACCESS_TOKEN_SECRET;
    const jwtToken = new TextEncoder().encode(TOKEN);
    return jwtToken;
  }
  
const verifyTokenExists = (request: Request) => {
    const authToken = request.headers.authorization;
  
    if (!authToken) {
      throw new HttpError("Token não enviado", 401);
    };
    
    return authToken;
    };


export const trpcEnsureAuthenticated = middleware(async (opts) => {
    const { ctx } = opts;
    const { req, res } = ctx;
    const authToken = verifyTokenExists(req);

    const token = authToken.split(" ")[1];

    const { payload, protectedHeader } = await jwtVerify(token, getToken(), {
      issuer: 'urn:example:issuer',
      audience: 'urn:example:audience',
    })

    const { userId } = payload as { userId:string };

    req.headers.userId = userId;

    return opts.next({
      ctx: {
        userId,
      },
    });
  });
   