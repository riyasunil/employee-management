import { Repository, FindOneOptions, FindOptionsWhere, IsNull } from "typeorm";
import Department from "../entities/department.entity";


class DepartmentRepository {
    constructor(private repository : Repository<Department>){}

    async findOne(options? : FindOneOptions<Department>) : Promise<Department | null>{
        return this.repository.findOne(options);
    }

    async findMany() : Promise<Department[]> {
        return this.repository.find();
    }

    async findOneById(id : number) : Promise<Department>{
        return this.repository.findOneBy({id});
    }

    async findOneByName(name : string) : Promise<Department>{
        return this.repository.findOneBy({name})
    }

    async create(department:Department) : Promise<Department>{
        return this.repository.save(department)
    }

    async update(id: number, department:Department){
        await this.repository.save({id, ...department})
    }

    //direct deletion from db
    async delete(id:number){
        await this.repository.delete(id)
    }

    //deletion of an entity alr created
    async remove(department : Department){
        await this.repository.softRemove(department)
    }
}


export default DepartmentRepository