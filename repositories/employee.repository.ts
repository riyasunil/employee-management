import { Repository } from "typeorm";
import Employee from "../entities/employee.entity";
import employeeRouter from "../employeeRouter";

class EmployeeRepository {
    //private ==> repository is of the class
    //if no private, we have to add this.repository = repository inside the constructor
    constructor(private repository : Repository<Employee> ){}

    async create(employee: Employee) : Promise<Employee> {
        return this.repository.save(employee)
    }

    async findMany() : Promise<Employee[]> {
        return this.repository.find({relations : { address : true}});
    }

    async findOneById(id : number) : Promise<Employee> {
        return this.repository.findOne({where : {id}, relations : {
            address : true,
            department : true
        }})
    }

    async findOneByEmail(email : string) : Promise<Employee | null >{
        return this.repository.findOneBy({email});
        //??? what is a repository what is it a reference to how does it have all these functions
    }
    //the reason we are using await here because prev we return promise with records, but here, we are returning nothing even though it's an async function
    async update(id: number, employee: Employee){
        await this.repository.save({id,...employee})
    }

    async delete (id:number){
        await this.repository.delete(id)
    }

    async remove(employee : Employee){
        await this.repository.softRemove(employee)
    }
}

export default EmployeeRepository