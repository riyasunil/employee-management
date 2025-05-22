import HttpException from "../exceptions/httpException";
import EmployeeService from "../services/employee.service";
import {Request, Response,Router, NextFunction } from 'express'
import { isEmail } from "../validators/emailValidator";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/createEmployeeDto";
import { validate } from "class-validator";

export default class EmployeeController {
    constructor (private employeeService : EmployeeService, router : Router) {
        router.post("/", this.createEmployee.bind(this))
        router.get("/", this.getAllEmployees.bind(this))
        router.get("/:id", this.getEmployeeById.bind(this))
        router.put("/:id", this.updateEmployee)
        router.delete("/:id", this.deleteEmployee.bind(this))
    }

    async createEmployee(req : Request, resp : Response, next : NextFunction) {
        try{
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body)
            const errors = await validate(createEmployeeDto)

            if (errors.length > 0) {
                console.log(JSON.stringify(errors))
                throw new HttpException(412, JSON.stringify(errors))
            }

            const email = req.body.email
            const name = req.body.name
            const age = req.body.age
            const address = req.body.address
            const password = req.body.password
            const role = req.body.role
            const newEmployee = await this.employeeService.createEmployee(email, name, age, address, password, role)
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
        const id = Number(req.params.id)
        const email = req.body.email
        const name = req.body.name
        await this.employeeService.updateEmployee(id, name, email)
        resp.status(200).send()
    }

    async deleteEmployee(req : Request, resp : Response){
        const id = Number(req.params.id)
        await this.employeeService.deleteEmployee(id)
        resp.status(204).send()
    }
}

// function errorHandler (req, resp, next)  {

// }
