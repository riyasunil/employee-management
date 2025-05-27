import { when } from "jest-when";
import { mock, MockProxy } from "jest-mock-extended";
import EmployeeRepository from "../../repositories/employee.repository";
import EmployeeService from "../../services/employee.service";
import Employee, { EmployeeRole } from "../../entities/employee.entity";
import { error } from "winston"; // is this the error thats supposed to be returned by the failure of getEmployeeById etc functions??? seems to pass the unit test

describe("EmployeeService", () => {
  let employeeRepository: MockProxy<EmployeeRepository>; //this can be replaced when the data source is mocked in test containers
  let employeeService: EmployeeService;
  beforeEach(() => {
    employeeRepository = mock<EmployeeRepository>();
    employeeService = new EmployeeService(employeeRepository);
  });

  //gets employee by id
  describe("getEmployeeById", () => {
    it("getEmployeeById returns employee", async () => {
      const mockEmployee = {
        email: "ria@gmail.com",
        name: "ria",
        age: 21,
        password:
          "$2b$10$LZ768WtcoS.pUhh1cHf64Osk265lWEuJf/Qm7V6fQXJUySg1hi89.",
        role: "HR",
        id: 6,
        createdAt: "2025-05-22T06:29:26.321Z",
        updatedAt: "2025-05-22T06:29:26.321Z",
        deletedAt: null,
      };
      when(employeeRepository.findOneById)
        .calledWith(6)
        .mockReturnValue(mockEmployee); //this asserts the db call
      const res = await employeeService.getEmployeeById(6);
      expect(employeeRepository.findOneById).toHaveBeenCalledWith(6);
      expect(res).toStrictEqual(mockEmployee);
    });
  });

  //no employee found in getEmployeeById
  describe("getEmployeeById", () => {
    it("getEmployeeById returns employee", async () => {
      when(employeeRepository.findOneById)
        .calledWith(6)
        .mockReturnValue(error); //this asserts the db call
      const res = await employeeService.getEmployeeById(6);
      expect(employeeRepository.findOneById).toHaveBeenCalledWith(6);
      expect(res).toStrictEqual(error);
    });
  });

  describe("getEmployeeByEmail", () => {
    it("getEmployeeByEmail returns employee", async () => {
      const mockEmployee = {
        email: "ria@gmail.com",
        name: "ria",
        age: 21,
        password:
          "$2b$10$LZ768WtcoS.pUhh1cHf64Osk265lWEuJf/Qm7V6fQXJUySg1hi89.",
        role: "HR",
        id: 6,
        createdAt: "2025-05-22T06:29:26.321Z",
        updatedAt: "2025-05-22T06:29:26.321Z",
        deletedAt: null,
      };
      when(employeeRepository.findOneByEmail)
        .calledWith("ria@gmail.com")
        .mockReturnValue(mockEmployee); //this asserts the db call
      const res = await employeeService.getEmployeeByEmail("ria@gmail.com");
      expect(employeeRepository.findOneByEmail).toHaveBeenCalledWith("ria@gmail.com");
      expect(res).toStrictEqual(mockEmployee);
    });
  });

  describe("getEmployeeByEmail", () => {
    it("getEmployeeByEmail returns no employee", async () => {

      when(employeeRepository.findOneByEmail)
        .calledWith("ria@gmail.com")
        .mockReturnValue(error); //this asserts the db call
      const res = await employeeService.getEmployeeByEmail("ria@gmail.com");
      expect(employeeRepository.findOneByEmail).toHaveBeenCalledWith("ria@gmail.com");
      expect(res).toStrictEqual(error);
    });
  });

  describe("getAllEmployees", () => {
    it("getAllEmployees returns all employees", async () => {
      const mockEmployees = [
        {
          email: "ria@gmail.com",
          name: "ria",
          age: 21,
          password:
            "$2b$10$LZ768WtcoS.pUhh1cHf64Osk265lWEuJf/Qm7V6fQXJUySg1hi89.",
          role: "HR",
          id: 6,
          createdAt: "2025-05-22T06:29:26.321Z",
          updatedAt: "2025-05-22T06:29:26.321Z",
          deletedAt: null,
        },
        {
          email: "vivek@gmail.com",
          name: "vivek",
          age: 21,
          password:
            "$2b$10$LZ768WtcoS.pUhh1cHfskdjfn64Osk265lWEuJf/Qm7V6fQXJUySg1hi89.",
          role: "DEV",
          id: 7,
          createdAt: "2025-05-22T06:29:26.321Z",
          updatedAt: "2025-05-22T06:29:26.321Z",
          deletedAt: null,
        },
      ];

      when(employeeRepository.findMany).mockReturnValue(mockEmployees);
      const res = await employeeService.getAllEmployees();
      expect(res).toStrictEqual(mockEmployees);
    });
  });
});
