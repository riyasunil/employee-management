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
  