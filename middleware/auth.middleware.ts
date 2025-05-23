import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import HttpException from "../exceptions/httpException";
import { JwtPayload } from "../dto/jwt.payload";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const getToken = (req: Request): string | undefined => {
  const token = req.headers.authorization;
  if (!token) {
    return undefined;
  }
  return token.replace("Bearer ", "");
};

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = getToken(req);
  console.log(token)
  if (!token) {
    throw new HttpException(401, "Unauthorized");
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (error) {
    throw new HttpException(401, "Unauthorized");
  }
};

export default authenticationMiddleware;
