import EmployeeService from "../services/employee.service";
import AuthController from "../controllers/auth.controller";
import dataSource from "../db/data-source";
import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import { AuthService } from "../services/auth.service";
import departmentRouter from "./departments.router";

const employeeRepository = new EmployeeRepository(
  dataSource.getRepository(Employee),
);
const employeeService = new EmployeeService(employeeRepository);
const authService = new AuthService(employeeService);
const authController = new AuthController(authService);
const authRouter = authController.router;

export default authRouter;
