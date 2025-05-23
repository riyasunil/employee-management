import { IsArray, isDate, IsEmail, IsEnum, isNotEmpty, IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./createAddressDto";
import { Column } from "typeorm";
import { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";
import { CreateDepartmentDto } from "./createDepartmentDto";
import { PassDepartmentDto } from "./passDepartmentDto";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ValidateNested()
  @Type(()=> CreateAddressDto)
  address : CreateAddressDto

  @ValidateNested()
  @Type(()=> PassDepartmentDto)
  department : PassDepartmentDto

  // @IsNumber()
  // departmentID : number;

  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  @Column()
  password : string

  @Column()
  @IsEnum(EmployeeRole)
  role : EmployeeRole

  // @IsArray()
  // @IsString({each : true})
  // roles : string[]


  @Column()
  @IsEnum(EmployeeStatus)
  status : EmployeeStatus

  @IsNotEmpty()
  dateOfJoining: Date

  // departmentId? : number

  @IsNumber()
  @IsNotEmpty()
  experience : number;
  
}