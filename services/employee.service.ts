import EmployeeRepository from "../repositories/employee.repository";
import Employee, {
  EmployeeRole,
  EmployeeStatus,
} from "../entities/employee.entity";
import Address from "../entities/address.entity";
import bcrypt from "bcrypt";
import Department from "../entities/department.entity";
import DepartmentService from "./department.services";
import HttpException from "../exceptions/httpException";
import { LoggerService } from "./loggerService";

const logger = LoggerService.getInstance("service()");
class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {} //these are dependencies

  async createEmployee(
    employeeId: string,
    name: string,
    email: string,
    age: number,
    address: Address,
    password: string,
    role: EmployeeRole,
    department: Department,
    status: EmployeeStatus,
    dateOfJoining: Date,
    experience: number
  ): Promise<Employee> {
    // const isDepartmentValid = await this.departmentService.getDepartmentValidity(department);

    // if (!isDepartmentValid) {
    //     throw new HttpException(404, `Department does not exist or is not active.`);
    // }

    try {
      const newAddress = new Address();
      newAddress.line1 = address.line1;
      newAddress.line2 = address.line2;
      newAddress.houseNo = address.houseNo;
      newAddress.pincode = address.pincode;

      const newEmployee = new Employee();
      newEmployee.employeeId = employeeId;
      newEmployee.email = email;
      newEmployee.name = name;
      newEmployee.age = age;
      newEmployee.address = newAddress;
      newEmployee.password = await bcrypt.hash(password, 10); //salt = 10
      newEmployee.role = role;
      newEmployee.status = status;
      newEmployee.department = department; //problem with passing department id here is it doesnt check if the department id is valid or not
      newEmployee.dateOfJoining = dateOfJoining;
      newEmployee.experience = experience;
      return await this.employeeRepository.create(newEmployee);
    } catch (error) {
      logger.error(`Error creating employee: ${error.message}`);
      throw new HttpException(
        500,
        `Failed to create employee: ${error.message}`
      );
    }
  }

  async getAllEmployees(): Promise<Employee[]> {
    try {
      const employees = await this.employeeRepository.findMany();
      logger.info("Successfully retrieved all employees.");
      return employees;
    } catch (error) {
      logger.error(`Error retrieving all employees: ${error.message}`);
      throw new HttpException(
        500,
        `Failed to retrieve employees: ${error.message}`
      );
    }
    return;
  }

  async getEmployeeById(id: number): Promise<Employee> {
    try {
      const employee = await this.employeeRepository.findOneById(id);
      if (!employee) {
        logger.error(`Employee with ID ${id} not found.`);
        throw new HttpException(404, `Employee with ID ${id} not found`);
      }
      logger.info(`Successfully retrieved employee with id : ${id}`);
      return employee;
    } catch (error) {
      logger.error(`Error retrieving employee ${id}: ${error.message}`);
      throw new HttpException(
        500,
        `Failed to retrieve employee ${id}: ${error.message}`
      );
    }
  }

  async getEmployeeByEmail(email: string): Promise<Employee | null> {
    try {
      const employee = await this.employeeRepository.findOneByEmail(email);
      if (!employee) {
        logger.error(`Employee with ID ${email} not found.`);
        throw new HttpException(404, `Employee with ID ${email} not found`);
      }
      logger.info(`Successfully retrieved employee with id : ${email}`);
      return employee;
    } catch (error) {
      logger.error(`Error retrieving employee ${email}: ${error.message}`);
      throw new HttpException(
        500,
        `Failed to retrieve employee ${email}: ${error.message}`
      );
    }
  }

  async updateEmployee(
    id: number,
    name: string,
    email: string,
    role: EmployeeRole,
    address: Address
  ) {
    try {
      const employeeExist = await this.employeeRepository.findOneById(id);
      if (!employeeExist) {
        logger.error(`Employee with ID ${id} not found for update.`);
        throw new HttpException(404, `Employee with ID ${id} not found`);
      }

      const prevEmployeeName = employeeExist.name;
      employeeExist.name = name;
      employeeExist.email = email;
      employeeExist.role = role;
      employeeExist.address.line1 = address.line1;
      employeeExist.address.line2 = address.line2;
      employeeExist.address.houseNo = address.houseNo;
      employeeExist.address.pincode = address.pincode;

      await this.employeeRepository.update(id, employeeExist);
      logger.info(
        `Employee ${prevEmployeeName} exists with ID :${id} updated to ${name}`
      );
      return employeeExist;
    } catch (error) {
      logger.error(`Error updating employee with ID :${id} : ${error.message}`);
      throw new HttpException(
        500,
        `Failed to update employee with ID ${id}: ${error.message}`
      );
    }
  }

  async deleteEmployee(id: number) {
    try {
      const employeeExist = await this.employeeRepository.findOneById(id);
      if (!employeeExist) {
        logger.error(`Employee with ID ${id} not found for deletion.`);
        throw new HttpException(404, `Employee with ID ${id} not found`);
      }
      await this.employeeRepository.remove(employeeExist);
      logger.info(`Successfully deleted employee with ID: ${id}`);
    } catch (error) {
      logger.error(`Error deleting employee with ID ${id}: ${error.message}`);
      throw new HttpException(
        500,
        `Failed to delete deparemployeetment with ID ${id}: ${error.message}`
      );
    }
  }

  
}

export default EmployeeService;
