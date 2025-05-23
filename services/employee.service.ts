import EmployeeRepository from "../repositories/employee.repository";
import Employee, { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";
import Address from "../entities/address.entity";
import bcrypt from "bcrypt";
import Department from "../entities/department.entity";
import DepartmentService from "./department.services";
import HttpException from "../exceptions/httpException";

class EmployeeService {
    constructor(private employeeRepository : EmployeeRepository){} //these are dependencies

    async createEmployee(employeeId:string, name:string, email:string, age:number, address :Address, password:string, role: EmployeeRole, department: Department, status:EmployeeStatus, dateOfJoining:Date, experience : number) : Promise<Employee>{
            // const isDepartmentValid = await this.departmentService.getDepartmentValidity(department);

            // if (!isDepartmentValid) {
            //     throw new HttpException(404, `Department does not exist or is not active.`);
            // }

            const newAddress = new Address();
            newAddress.line1 = address.line1
            newAddress.line2 = address.line2
            newAddress.houseNo = address.houseNo
            newAddress.pincode = address.pincode

            const newEmployee = new Employee();
            newEmployee.employeeId = employeeId;
            newEmployee.email = email;
            newEmployee.name = name;
            newEmployee.age = age
            newEmployee.address = newAddress 
            newEmployee.password = await bcrypt.hash(password, 10) //salt = 10
            newEmployee.role = role
            newEmployee.status = status
            newEmployee.department = department //problem with passing department id here is it doesnt check if the department id is valid or not
            newEmployee.dateOfJoining = dateOfJoining
            newEmployee.experience = experience
            return this.employeeRepository.create(newEmployee)
    }
    
    async getAllEmployees() : Promise<Employee[]>{
        return this.employeeRepository.findMany()
    }

    async getEmployeeById(id:number) : Promise<Employee>{
         let employee = this.employeeRepository.findOneById(id);
        if(!employee){
           throw new Error("Employee not found")
        }
        return employee;
        // return this.employeeRepository.findOneById(id)
    } 

    async getEmployeeByEmail(email:string) : Promise<Employee | null>{
        
        return this.employeeRepository.findOneByEmail(email);
    }

    async updateEmployee(id: number, name:string, email:string, role:EmployeeRole, address:Address){
        const employeeExist = await this.employeeRepository.findOneById(id)
        if (employeeExist){
            employeeExist.email = email;
            employeeExist.name = name;
            employeeExist.role = role;
            employeeExist.address.line1 = address.line1;
            employeeExist.address.line2 = address.line2;
            employeeExist.address.houseNo = address.houseNo;
            employeeExist.address.pincode = address.pincode;
            await this.employeeRepository.update(id, employeeExist)
        }
    }

    async deleteEmployee(id : number) {
        const employeeExist = await this.employeeRepository.findOneById(id)
        if (employeeExist){
            //await this.employeeRepository.delete(id)
            await this.employeeRepository.remove(employeeExist)
        }
    }
}

export default EmployeeService