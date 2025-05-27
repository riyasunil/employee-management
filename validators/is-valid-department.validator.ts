import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import datasource from '../db/data-source'; 
import Department from '../entities/department.entity';

@ValidatorConstraint({ name: 'isValidDepartment', async: true })
export class IsValidDepartmentConstraint implements ValidatorConstraintInterface {
  async validate(departmentId: number): Promise<boolean> {
    if (!departmentId) return false;
    
    const departmentRepository = datasource.getRepository(Department);
    
    const department = await departmentRepository.findOne({
      where: { id: departmentId },
      withDeleted: false, 
    });
    
    return !!department;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Department with ID $value does not exist or has been deleted';
  }
}

export function IsValidDepartment(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidDepartmentConstraint,
    });
  };
}