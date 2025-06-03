import { IsArray, IsEnum, IsOptional, IsPositive, IsString } from "class-validator";
import { CreateEmployeeDto } from "./createEmployeeDto";
import { UpdateAddressDto } from "./updateAddressDto";
import { EmployeeStatus } from "../entities/employee.entity";

export class UpdateEmployeeDto{
    @IsString()
    @IsOptional()
    name? : string;

    @IsString()
    @IsOptional()
    email? : string;

    @IsArray()
    @IsString({each : true})
    @IsOptional()
    roles ? : string[]

    @IsOptional()
    address? : UpdateAddressDto;

    @IsOptional()
    status? : EmployeeStatus;

    @IsOptional()
    departmentId? : number;

    @IsOptional()
    password? : string;
}
