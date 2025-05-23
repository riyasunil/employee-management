import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne} from "typeorm";
import Abstract from "./abstract.entity";
import Address from "./address.entity";
import Department from "./department.entity";
// import EmployeeRole from "./employeeRole.entity";

export enum EmployeeRole {
  UI = "UI",
  UX = "UX",
  DEV = "DEV",
  HR = "HR",
  MANAGER = "MANAGER"
}

export enum EmployeeStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PROBATION = "PROBATION",
}

// let EmployeeRoles = new Array('UI', 'DEV', 'HR', 'MANAGER');

@Entity() class Employee extends Abstract{
    @Column() employeeId : string;
    @Column({unique : true}) email: string;
    @Column() name: string;
    @Column() age: number;
    
    @OneToOne(() => Address, (address) => address.employee, {
      cascade : true,
      onDelete : 'CASCADE',
    })
    @JoinColumn()
    address : Address

    @Column() password:string;

    @Column({
      type : "enum",
      enum : EmployeeRole,
      default : EmployeeRole.DEV
    }) role : EmployeeRole;

    //  @Column({
    //   type : "enum",
    //   enum : EmployeeRole,
    //   array : true,
    //   default : []
    // }) role : EmployeeRole;

    // @ManyToMany(() => EmployeeRole, (role) => role.employees, {
    // cascade: true,
    // })
    //   @JoinTable({
    //   name: "employee_roles",
    //   joinColumn: {
    //     name: "employee_id",
    //     referencedColumnName: "id",
    //   },
    //   inverseJoinColumn: {
    //     name: "role_id",
    //     referencedColumnName: "id",
    //   },
    // })
    // roles: EmployeeRole[];

    @Column({type : "date"}) dateOfJoining: Date; //date_time_with_timezone
    //many emp 1 dept
    //this on delete only works if its a hard delete.since we are soft removing the department, this employees department id will remain unchanged.
    @ManyToOne(() => Department, (department)=> department.employees, {onDelete:'SET NULL', nullable: true}) //change to RESTRICT when depts shouldnt be deletable when there are employees linked to that dept
    @JoinColumn({ name: 'department_id' })
    department:Department;

    @Column() experience : number;

    @Column({
      type : "enum",
      enum : EmployeeStatus,
      default : EmployeeStatus.INACTIVE
    }) status : EmployeeStatus;

  }
  
  export default Employee;
  