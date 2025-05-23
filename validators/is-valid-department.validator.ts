// validators/is-valid-department.validator.ts
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import datasource from '../db/data-source'; // Your TypeORM data source
import Department from '../entities/department.entity';

@ValidatorConstraint({ name: 'isValidDepartment', async: true })
export class IsValidDepartmentConstraint implements ValidatorConstraintInterface {
  async validate(departmentId: number): Promise<boolean> {
    if (!departmentId) return false;
    
    const departmentRepository = datasource.getRepository(Department);
    
    // Check if department exists and is not soft-deleted
    const department = await departmentRepository.findOne({
      where: { id: departmentId },
      withDeleted: false, // This ensures soft-deleted records are excluded
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