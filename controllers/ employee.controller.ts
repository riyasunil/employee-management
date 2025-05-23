import HttpException from "../exceptions/httpException";
import EmployeeService from "../services/employee.service";
import {Request, Response,Router, NextFunction } from 'express'
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/createEmployeeDto";
import { validate } from "class-validator";
import { authorizationMiddleware } from "../middleware/authorization.middlewear";
import { UpdateEmployeeDto } from "../dto/updateEmployeeDto";
import { LoggerService } from "../services/loggerService";

const logger = LoggerService.getInstance('server()');

export default class EmployeeController {
    
    constructor (private employeeService : EmployeeService, router : Router) {
        logger.info('Employee controller initialized')
        router.post("/", authorizationMiddleware, this.createEmployee.bind(this)) //check what happens without bind
        router.get("/", this.getAllEmployees.bind(this))
        router.get("/:id", this.getEmployeeById.bind(this))
        router.put("/:id", authorizationMiddleware, this.updateEmployee.bind(this))
        router.delete("/:id", authorizationMiddleware, this.deleteEmployee.bind(this))
    }
    
    async createEmployee(req : Request, resp : Response, next : NextFunction) {
        try{
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body)
            const errors = await validate(createEmployeeDto)

            if (errors.length > 0) {
                logger.error("error : " + JSON.stringify(errors))
                throw new HttpException(412, JSON.stringify(errors))
            }

            const empId = req.body.employeeId
            const email = req.body.email
            const name = req.body.name
            const age = req.body.age
            const address = req.body.address
            const password = req.body.password
            const role = req.body.role
            const status = req.body.status
            const department = req.body.department
            const dateOfJoining = req.body.dateOfJoining
            const experience = req.body.experience
            const newEmployee = await this.employeeService.createEmployee(empId, name, email, age, address, password, role, department, status, dateOfJoining, experience)
            resp.status(201).send(newEmployee)
        }catch(error){
            next(error)
        }
    }

    async getAllEmployees(req : Request, resp : Response){
        const employees = await this.employeeService.getAllEmployees()
        resp.status(200).send(employees)
    }

    async getEmployeeById(req : Request, resp : Response, next : NextFunction){
        try{
            const id = Number(req.params.id)
            const employee = await this.employeeService.getEmployeeById(id)
            if (!employee){
                throw new HttpException(404,`Employee with the id ${id} does not exist`)
            }
            resp.status(200).send(employee)
        }catch(error ){
            next(error)
        }
    }

    updateEmployee = async(req : Request, resp : Response) => {
        try {
            const updateEmployee = plainToInstance(UpdateEmployeeDto, req.body);
            const errors = await validate(updateEmployee)

            if (errors.length > 0) {
                console.log(JSON.stringify(errors))
                throw new HttpException(412, JSON.stringify(errors))
            }

            const id = Number(req.params.id)
            const email = req.body.email
            const name = req.body.name
            const role = req.body.role
            const address = req.body.address

            const result = await this.employeeService.updateEmployee(id, name, email, role, address)
            resp.status(201).send(result)
        } catch (error) {
            resp.status(400).send(JSON.stringify({error : error}));
        }
        
    }

    async deleteEmployee(req : Request, resp : Response){
        try {
            const id = Number(req.params.id)
            await this.employeeService.deleteEmployee(id)
            resp.status(204).send()
        } catch (error) {
            resp.status(400).send(JSON.stringify({error : error}));
        }
        
    }

}

// function errorHandler (req, resp, next)  {

// }
