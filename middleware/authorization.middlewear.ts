import {Request, Response, NextFunction} from "express";
import { EmployeeRole } from "../entities/employee.entity";
import HttpException from "../exceptions/httpException";
export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    console.log(role);
    if(role !== EmployeeRole.HR){
        throw new HttpException(403, "User has no privilege to access the resources");
    }
    next();
}

