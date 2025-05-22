import EmployeeRepository from "../repositories/employee.repository";
import Employee, { EmployeeRole } from "../entities/employee.entity";
import Address from "../entities/address.entity";

class EmployeeService {
    constructor(private employeeRepository : EmployeeRepository){}

    async createEmployee(name:string, email:string, age:number, address :Address, password:string, role: EmployeeRole) : Promise<Employee>{
            const newEmployee = new Employee();
            newEmployee.email = email;
            newEmployee.name = name;
            newEmployee.age = age
            newEmployee.address = address
            newEmployee.password = password
            newEmployee.role = role
            return this.employeeRepository.create(newEmployee)
    }
    
    async getAllEmployees() : Promise<Employee[]>{
        return this.employeeRepository.findMany()
    }

    async getEmployeeById(id:number) : Promise<Employee>{
        return this.employeeRepository.findOneById(id)
    } 

    async updateEmployee(id: number, name:string, email:string){
        const employeeExist = await this.employeeRepository.findOneById(id)
        if (employeeExist){
            const employee = new Employee();
            employee.email = email;
            employee.name = name;
            await this.employeeRepository.update(id, employee)
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