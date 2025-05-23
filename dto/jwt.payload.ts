import { EmployeeRole } from "../entities/employee.entity"

export class JwtPayload{
    id : Number
    email : String
    role : EmployeeRole
}