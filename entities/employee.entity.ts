import { Column, Entity, JoinColumn, OneToOne} from "typeorm";
import Abstract from "./abstract.entity";
import Address from "./address.entity";


export enum EmployeeRole {
  UI = "UI",
  UX = "UX",
  DEV = "DEV",
  HR = "HR" 
}

@Entity() class Employee extends Abstract{
    @Column({unique : true}) email: string;
    @Column() name: string;
    @Column() age: number;
    
    @OneToOne(() => Address, (address) => address.employee, {
      cascade : true,
      onDelete : 'CASCADE'
    })
    @JoinColumn()
    address : Address

    @Column() password:string;

    @Column({
      type : "enum",
      enum : EmployeeRole,
      default : EmployeeRole.DEV
    }) role : EmployeeRole;


  }
  
  export default Employee;
  