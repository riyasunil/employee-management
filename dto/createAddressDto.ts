import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  line1: string;

  @IsNotEmpty()
  @IsString()
  line2: string;

  @IsNotEmpty()
  @IsString()
  houseNo: string;

  @IsNotEmpty()
  @IsString()
  pincode: string;
}