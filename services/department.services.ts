import { IsNull } from "typeorm";
import Department from "../entities/department.entity";
import DepartmentRepository from "../repositories/department.repository";
import HttpException from "../exceptions/httpException";
import { LoggerService } from "./loggerService";

const logger = LoggerService.getInstance("server()");

class DepartmentService {
  constructor(private departmentRepository: DepartmentRepository) {}

  async getAllDepartments(): Promise<Department[]> {
    try {
      const departments = await this.departmentRepository.findMany();
      logger.info("Successfully retrieved all departments.");
      return departments;
    } catch (error) {
      logger.error(`Error retrieving all departments: ${error.message}`);
      throw new HttpException(
        500,
        `Failed to retrieve departments: ${error.message}`
      );
    }
  }

  async getDepartmentById(id: number): Promise<Department> {
    try {
      const department = await this.departmentRepository.findOneById(id);
      if (!department) {
        logger.error(`Department with ID ${id} not found.`);
        throw new HttpException(404, `Department with ID ${id} not found`);
      }
      logger.info(`Successfully retrieved departments with id : ${id}`);
      return department;
    } catch (error) {
      logger.error(`Error retrieving department ${id}: ${error.message}`);
      throw new HttpException(
        500,
        `Failed to retrieve department ${id}: ${error.message}`
      );
    }
  }

  async getDepartmentByName(name: string): Promise<Department> {
    try {
      const department = await this.departmentRepository.findOneByName(name);
      if (!department) {
        logger.error(`Department with name ${name} not found.`);
        throw new HttpException(404, `Department with name ${name} not found`);
      }
      logger.info(`Successfully retrieved departments with name : ${name}`);
      return department;
    } catch (error) {
      logger.error(
        `Error retrieving department by name "${name}": ${error.message}`
      );
      throw new HttpException(
        500,
        `Failed to retrieve department by name "${name}": ${error.message}`
      );
    }
  }

  //   async getDepartmentValidity(dep: Department): Promise<Boolean> {
  //     let res = this.departmentRepository.findOne({
  //       where: { id: dep.id, deletedAt: IsNull() },
  //     });
  //     if (!res) {
  //       logger.error("Department not found");
  //       // throw new HttpException(404, "Department not found")
  //       return false;
  //     }
  //     return true;
  //   }

  async createDepartment(name: string): Promise<Department> {
    try {
      const newDepartment = new Department();
      newDepartment.name = name;
      const department = await this.departmentRepository.create(newDepartment);
      logger.info(
        `Successfully created department with name: ${name}, ID: ${department.id}`
      );
      return department;
    } catch (error) {
          const errorMessage = error?.message ?? String(error) ?? "Unknown error";
      logger.error(
        `Error creating department with name "${name}": ${errorMessage}`
      );
      throw new HttpException(
        500,
        `Failed to create department: ${errorMessage}`
      );
    }
  }

  async updateDepartment(id: number, name: string) {
    try {
      const departmentExists = await this.departmentRepository.findOneById(id);
      if (!departmentExists) {
        logger.error(`Department with ID ${id} not found for update.`);
        throw new HttpException(404, `Department with ID ${id} not found`);
      }

      const prevDepartmentName = departmentExists.name;
      departmentExists.name = name;
      await this.departmentRepository.update(id, departmentExists);
      logger.info(
        `Department ${prevDepartmentName} exists with ID :${id} updated to ${name}`
      );
    } catch (error) {
      logger.error(
        `Error updating department with ID :${id} : ${error.message}`
      );
      throw new HttpException(
        500,
        `Failed to update department with ID ${id}: ${error.message}`
      );
    }
  }

  async deleteDepartment(id: number) {
    try {
      const departmentExist = await this.departmentRepository.findOneById(id);
      if (!departmentExist) {
        logger.error(`Department with ID ${id} not found for deletion.`);
        throw new HttpException(404, `Department with ID ${id} not found`);
      }
      await this.departmentRepository.remove(departmentExist);
      logger.info(`Successfully deleted department with ID: ${id}`);
    } catch (error) {
      logger.error(`Error deleting department with ID ${id}: ${error.message}`);
      throw new HttpException(
        500,
        `Failed to delete department with ID ${id}: ${error.message}`
      );
    }
  }
}

export default DepartmentService;
