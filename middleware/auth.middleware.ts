import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import HttpException from "../exceptions/httpException";
import { JwtPayload } from "../dto/jwt.payload";
import { LoggerService } from "../services/loggerService";
import { server } from "typescript";

const logger = LoggerService.getInstance('server()');
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
    logger.error("No access token provided");
    return undefined;
  }
  logger.info("Token sucessfully extracted");
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
    logger.error("No access token provided");
    throw new HttpException(401, "Unauthorized");
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (error) {
    logger.error("Error authorizing request");
    throw new HttpException(401, "Unauthorized");
  }
};

export default authenticationMiddleware;
