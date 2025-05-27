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

  //   describe("Create employee returns the newly created employee details", async() => {
  //     const mockEmployee = {
  //         employeeId : "KV123",
  //         email: "ria@gmail.com",
  //         name: "ria",
  //         age: 21,
  //         password:
  //           "$2b$10$LZ768WtcoS.pUhh1cHf64Osk265lWEuJf/Qm7V6fQXJUySg1hi89.",
  //         role: EmployeeRole.HR,
  //         id: 6,
  //         createdAt: "2025-05-22T06:29:26.321Z",
  //         dateOfJoining: "2025-05-22T06:29:26.321Z",
  //         updatedAt: "2025-05-22T06:29:26.321Z",
  //         deletedAt: null,
  //         address : {
  //           line1 : "add1",
  //           line2 : "add2",
  //           houseNo : "123",
  //           pincode : "123456"
  //         },
  //         department : "HR",
  //         status : EmployeeStatus.ACTIVE,
  //         experience : 1
  //       };

  //       const mockEmployeeDepartment = new Department();

  //       const mockEmployeeAddress = new Address()
  //       mockEmployeeAddress.line1 = mockEmployee.address.line1
  //       mockEmployeeAddress.line2 = mockEmployee.address.line2
  //       mockEmployeeAddress.houseNo = mockEmployee.address.houseNo
  //       mockEmployeeAddress.pincode = mockEmployee.address.pincode

  //       const

  // const mockError = "Connection to database failed";

  // when(employeeRepository.create).calledWith(mockEmployee).mockRejectedValue(mockEmployee);
  //       await expect(employeeService.createEmployee(mockEmployee.employeeId, mockEmployee.name, mockEmployee.email, mockEmployee.age, mockEmployeeAddress, mockEmployee.password, mockEmployee.role, mockEmployee.department, mockEmployee.status, mockEmployee.dateOfJoining, mockEmployee.experience)).rejects.toBeInstanceOf(HttpException);
  //       expect(employeeRepository.create).toHaveBeenCalledWith(mockEmployee)
  //   })

  //update
  
//   describe("updateEmployee", () => {
//     it("update employee details returns the updated employee", async () => {

//        const mockEmployeeAddress = new Address()
//         mockEmployeeAddress.line1 = "add1"
//         mockEmployeeAddress.line2 = "add2"
//         mockEmployeeAddress.houseNo = "123"
//         mockEmployeeAddress.pincode = "123456"


//             const mockEmployee = {
//         email: "ria@gmail.com",
//         name: "ria",
//         age: 21,
//         password:
//           "$2b$10$LZ768WtcoS.pUhh1cHf64Osk265lWEuJf/Qm7V6fQXJUySg1hi89.",
//         role: EmployeeRole.HR,
//         id: 6,
//         createdAt: "2025-05-22T06:29:26.321Z",
//         updatedAt: "2025-05-22T06:29:26.321Z",
//         deletedAt: null,
//         address : mockEmployeeAddress
//       };

     

//       const updatedMockEmployee = {
//        ...mockEmployee, email : "updated@gmail.com"
//       };

//       const updatedEmployeeObject = {
//       ...mockEmployee,
//       email: "updated@gmail.com",
//       name: "ria",
//       role: EmployeeRole.HR,
//       address: mockEmployeeAddress,
//     };

//     when(employeeRepository.findOneById)
//       .calledWith(mockEmployee.id)
//       .mockResolvedValue(mockEmployee);
//       when(employeeRepository.update).calledWith(mockEmployee.id, mockEmployee.name, "updated@gmail.com", mockEmployee.role, mockEmployee.address).mockReturnValue(updatedMockEmployee);
//       const res = await employeeService.updateEmployee(mockEmployee.id, mockEmployee.name, "updated@gmail.com", mockEmployee.role, mockEmployee.address);
// expect(employeeRepository.update).toHaveBeenCalledWith(mockEmployee.id, mockEmployee.name, "updated@gmail.com", mockEmployee.role, mockEmployee.address)
// expect(res).toStrictEqual(updatedMockEmployee)
//     });
//   });
  //delete
});
