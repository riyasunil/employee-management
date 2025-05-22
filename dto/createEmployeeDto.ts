import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./createAddressDto";
import { Column } from "typeorm";
import { EmployeeRole } from "../entities/employee.entity";

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

  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  @Column()
  password : string

  @Column()
  @IsEnum(EmployeeRole)
  role : EmployeeRole
}