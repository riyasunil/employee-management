import { when } from "jest-when";
import { mock, MockProxy } from "jest-mock-extended";
import EmployeeRepository from "../../repositories/employee.repository";
import EmployeeService from "../../services/employee.service";
import Employee, {
  EmployeeRole,
  EmployeeStatus,
} from "../../entities/employee.entity";
import { error } from "winston"; // is this the error thats supposed to be returned by the failure of getEmployeeById etc functions??? seems to pass the unit test
import HttpException from "../../exceptions/httpException";
import Address from "../../entities/address.entity";
import Department from "../../entities/department.entity";

describe("EmployeeService", () => {
  let employeeRepository: MockProxy<EmployeeRepository>; //this can be replaced when the data source is mocked in test containers
  let employeeService: EmployeeService;
  beforeEach(() => {
    employeeRepository = mock<EmployeeRepository>();
    employeeService = new EmployeeService(employeeRepository);
  });

  //id

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

    it("getEmployeeById returns error", async () => {
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

      const mockError = "connection to database failed";

      when(employeeRepository.findOneById)
        .calledWith(6)
        .mockRejectedValue(new Error(mockError)); //this asserts the db call
      await expect(employeeService.getEmployeeById(6)).rejects.toBeInstanceOf(
        HttpException
      );
      expect(employeeRepository.findOneById).toHaveBeenCalledWith(6);
    });
  });

  //email
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
      expect(employeeRepository.findOneByEmail).toHaveBeenCalledWith(
        "ria@gmail.com"
      );
      expect(res).toStrictEqual(mockEmployee);
    });

    it("getEmployeeByEmail returns error", async () => {
      const mockError = "connection to database failed";

      when(employeeRepository.findOneByEmail)
        .calledWith("ria@gmail.com")
        .mockRejectedValue(new Error(mockError)); //this asserts the db call
      await expect(
        employeeService.getEmployeeByEmail("ria@gmail.com")
      ).rejects.toBeInstanceOf(HttpException);
      expect(employeeRepository.findOneByEmail).toHaveBeenCalledWith(
        "ria@gmail.com"
      );
    });
  });

  //all
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

    it("getAllEmployees returns error", async () => {
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
      const mockError = "connection to database failed";

      when(employeeRepository.findMany).mockRejectedValue(new Error(mockError));
      await expect(employeeService.getAllEmployees()).rejects.toBeInstanceOf(
        HttpException
      );
    });
  });

  //create


  //update

  describe("updateEmployee", () => {
    it("updateEmployee updates employee successfully", async () => {
      const id = 1;
      const prevEmployee = {
        id,
        name: "OldName",
        email: "old@example.com",
        role: EmployeeRole.HR,
        address: {
          line1: "OldLine 1",
          line2: "OldLine 2",
          houseNo: "123",
          pincode: "000000",
        },
      };

      const newName = "NewName";
      const newEmail = "new@example.com";
      const newRole = EmployeeRole.MANAGER;
      const newAddress = {
        line1: "NewLine 1",
        line2: "New Line 2",
        houseNo: "456",
        pincode: "111111",
      };

      const mockEmployeeAddress = new Address();
      mockEmployeeAddress.line1 = newAddress.line1;
      mockEmployeeAddress.line2 = newAddress.line2;
      mockEmployeeAddress.houseNo = newAddress.houseNo;
      mockEmployeeAddress.pincode = newAddress.pincode;

      const updatedEmployee = {
        ...prevEmployee,
        name: newName,
        email: newEmail,
        role: newRole,
        address: newAddress,
      };

      when(employeeRepository.findOneById)
        .calledWith(id)
        .mockResolvedValue({ ...prevEmployee });
      when(employeeRepository.update)
        .calledWith(id, expect.any(Object))
        .mockResolvedValue(undefined);

      const result = await employeeService.updateEmployee(
        id,
        newName,
        newEmail,
        newRole,
        mockEmployeeAddress
      );

      expect(employeeRepository.findOneById).toHaveBeenCalledWith(id);
      expect(employeeRepository.update).toHaveBeenCalledWith(
        id,
        expect.objectContaining({
          id,
          name: newName,
          email: newEmail,
          role: newRole,
          address: expect.objectContaining(newAddress),
        })
      );

      expect(result).toMatchObject(updatedEmployee);
    });

    it("updateEmployee throws ERROR when employee does not exist", async () => {
      const id = 1;
      const newName = "NeWName";
      const newEmail = "new@example.com";
      const newRole = EmployeeRole.DEV;
      const newAddress = {
        line1: "LIN21",
        line2: "LINE22",
        houseNo: "456",
        pincode: "111111",
      };

      const mockEmployeeAddress = new Address();
      mockEmployeeAddress.line1 = newAddress.line1;
      mockEmployeeAddress.line2 = newAddress.line2;
      mockEmployeeAddress.houseNo = newAddress.houseNo;
      mockEmployeeAddress.pincode = newAddress.pincode;

      when(employeeRepository.findOneById)
        .calledWith(id)
        .mockResolvedValue(null);

      await expect(
        employeeService.updateEmployee(
          id,
          newName,
          newEmail,
          newRole,
          mockEmployeeAddress
        )
      ).rejects.toBeInstanceOf(HttpException);

      expect(employeeRepository.update).not.toHaveBeenCalled();
    });

    it("updateEmployee fails to update employee", async () => {
      const id = 1;
      const prevEmployee = {
        id,
        name: "Old Name",
        email: "old@example.com",
        role: EmployeeRole.HR,
        address: {
          line1: "Old Line 1",
          line2: "Old Line 2",
          houseNo: "123",
          pincode: "000000",
        },
      };

      const newName = "New Name";
      const newEmail = "new@example.com";
      const newRole = EmployeeRole.UX;
      const newAddress = {
        line1: "New Line 1",
        line2: "New Line 2",
        houseNo: "456",
        pincode: "111111",
      };

      const mockEmployeeAddress = new Address();
      mockEmployeeAddress.line1 = newAddress.line1;
      mockEmployeeAddress.line2 = newAddress.line2;
      mockEmployeeAddress.houseNo = newAddress.houseNo;
      mockEmployeeAddress.pincode = newAddress.pincode;

      const error = new Error("DB update failed");

      when(employeeRepository.findOneById)
        .calledWith(id)
        .mockResolvedValue({ ...prevEmployee });
      when(employeeRepository.update)
        .calledWith(id, expect.any(Object))
        .mockRejectedValue(error);

      await expect(
        employeeService.updateEmployee(
          id,
          newName,
          newEmail,
          newRole,
          mockEmployeeAddress
        )
      ).rejects.toBeInstanceOf(HttpException);
    });
  });
});
