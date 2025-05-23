import { IsNotEmpty, IsNumber} from "class-validator";
import { IsValidDepartment } from "../validators/is-valid-department.validator";
export class PassDepartmentDto{

  @IsNotEmpty()
  @IsNumber()
  @IsValidDepartment()
  id: number;
}