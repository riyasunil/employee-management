import { IsNull } from "typeorm";
import Department from "../entities/department.entity";
import DepartmentRepository from "../repositories/department.repository";
import HttpException from "../exceptions/httpException";

class DepartmentService {
    constructor(private departmentRepository : DepartmentRepository){}

    async getAllDepartments() : Promise<Department[]>{
        return this.departmentRepository.findMany(); 
    }

    async getDepartmentById(id:number) : Promise<Department>{
        let res =   this.departmentRepository.findOneById(id);
        if(res){
            throw new Error("Department not found");
        }
        return res;
    }

    async getDepartmentByName(name: string) : Promise<Department>{
        let res = this.departmentRepository.findOneByName(name);
        if(!res){
            throw new Error("Department not found");
        }
        return res;
    }

    async getDepartmentValidity(dep : Department) : Promise<Boolean>{
        let res = this.departmentRepository.findOne({where : {id : dep.id, deletedAt : IsNull()} })
        if(!res){
            // throw new HttpException(404, "Department not found")
            return false
        }
        return true
    }

    async createDepartment(name:string) : Promise<Department>{
        const newDepartment = new Department();
        // newDepartment.id = id
        newDepartment.name = name
        let res =  this.departmentRepository.create(newDepartment)
        return res
    }

    async updateDepartment(id:number, name:string){
        const departmentExists = await this.departmentRepository.findOneById(id);
        if(departmentExists){
            departmentExists.name = name;
            await this.departmentRepository.update(id, departmentExists)
        }
    }

    async deleteDepartment(id : number) {
        const departmentExist = await this.departmentRepository.findOneById(id)
        if (departmentExist){
            await this.departmentRepository.remove(departmentExist)
        }
    }
}

export default DepartmentService