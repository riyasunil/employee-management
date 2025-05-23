import { validate } from "class-validator";
import { CreateDepartmentDto } from "../dto/createDepartmentDto";
import DepartmentService from "../services/department.services";
import {Request, Response,Router, NextFunction } from 'express'
import { plainToInstance } from "class-transformer";
import HttpException from "../exceptions/httpException";
import { UpdateDepartmentDto } from "../dto/updateDepartmentDto";
import { LoggerService } from "../services/loggerService";

const logger = LoggerService.getInstance('server()');

export default class DepartmentController {
    
    constructor(private departmentService : DepartmentService, router : Router) {
        logger.info('Deparment controller initialized')
        router.get("/", this.getAllDepartments.bind(this))
        router.post("/", this.createDepartment.bind(this))
        router.put("/", this.updateDepartment.bind(this))
        router.get("/:id", this.getDepartmentById.bind(this))
        router.get("/:id", this.getDepartmentByName.bind(this))
        router.delete("/:id", this.deleteDepartment.bind(this))
    }

    async getAllDepartments(req : Request, res: Response){
        try{
            const departments = await this.departmentService.getAllDepartments()
            res.status(200).send(departments); //send res of departments
        }catch(error){
            res.status(400).send(JSON.stringify(error))
        }
    }

    async getDepartmentById(req: Request, res:Response){
        try {
            const id = Number(req.params.id)
            const department = await this.departmentService.getDepartmentById(id)
            res.status(200).send(department);
        } catch (error) {
            res.status(400).send(JSON.stringify(error))
        }
    }

    async getDepartmentByName(req: Request, res:Response){
        try {
            const name = req.body.name;
            const department = await this.departmentService.getDepartmentById(name)
            res.status(200).send(department);
        } catch (error) {
            res.status(400).send(JSON.stringify(error))
        }
    }


    async createDepartment(req : Request, resp : Response, next : NextFunction) {
        try{
            const createDepartmentDto = plainToInstance(CreateDepartmentDto, req.body)
            const errors = await validate(createDepartmentDto)

            if (errors.length > 0) {
                console.log(JSON.stringify(errors))
                throw new HttpException(412, JSON.stringify(errors))
            }

            const name = req.body.name
            const newDepartment = await this.departmentService.createDepartment(name)
            resp.status(201).send(newDepartment)
        }catch(error){
            next(error)
        }
    }

    updateDepartment = async(req : Request, resp : Response) => {
        try {
            const updateDepartment = plainToInstance(UpdateDepartmentDto, req.body);
            const errors = await validate(updateDepartment)

            if (errors.length > 0) {
                console.log(JSON.stringify(errors))
                throw new HttpException(412, JSON.stringify(errors))
            }

            const id = Number(req.params.id)
            const name = req.body.name
            const result = await this.departmentService.updateDepartment(id, name)
            resp.status(201).send(result)
        } catch (error) {
            resp.status(400).send(JSON.stringify({error : error}));
        }
        
    }

    async deleteDepartment(req : Request, resp : Response){
        try {
            const id = Number(req.params.id)
        await this.departmentService.deleteDepartment(id)
        resp.status(204).send()
        } catch (error) {
            resp.status(400).send(JSON.stringify({error : error}));
        }
        
    }
}