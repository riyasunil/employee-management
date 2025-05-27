import {Request, Response, NextFunction} from "express";
import { EmployeeRole } from "../entities/employee.entity";
import HttpException from "../exceptions/httpException";
import { LoggerService } from "../services/loggerService";

const logger = LoggerService.getInstance('server()');
export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    logger.info(role);
    if(role !== EmployeeRole.HR){
        throw new HttpException(403, "User has no privilege to access the resources");
    }
    next();
}

