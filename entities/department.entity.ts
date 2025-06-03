import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import Abstract from "./abstract.entity";
import Employee from "./employee.entity";

@Entity() class Department extends Abstract{
    @Column() name: string;
    //dept has many emp
    //not inc in the create dept dto
    @OneToMany(() => Employee, (employee) => employee.department
  )
    employees: Employee[];
  }
  
  export default Department;
  


  /*
  
  import {
  Column,
  Entity,
  OneToMany,
} from "typeorm";
import Abstract from "./abstract.entity";
import Employee from "./employee.entity";

export enum DepartmentNames {
  "HR",
  "DEV",
  "DESIGN",
}

@Entity()
class Department extends Abstract {
  @Column({
    type : "enum",
    enum : DepartmentNames,
  }) 
  name : DepartmentNames;
  //dept has many emp
  //not inc in the create dept dto
  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}

export default Department;
*/