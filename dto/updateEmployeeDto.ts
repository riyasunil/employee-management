import { IsArray, IsEnum, IsOptional, IsPositive, IsString } from "class-validator";
import { CreateEmployeeDto } from "./createEmployeeDto";
import { UpdateAddressDto } from "./updateAddressDto";

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
}
