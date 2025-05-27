import { when } from "jest-when";
import { mock, MockProxy } from "jest-mock-extended";
import departmentService from "../../services/employee.service";
import Employee, { EmployeeRole } from "../../entities/employee.entity";
import { error } from "winston"; // is this the error thats supposed to be returned by the failure of getDepartmentById etc functions??? seems to pass the unit test
import DepartmentRepository from "../../repositories/department.repository";
import DepartmentService from "../../services/department.services";
import Department from "../../entities/department.entity";
import HttpException from "../../exceptions/httpException";

describe("departmentService", () => {
  let departmentRepository: MockProxy<DepartmentRepository>; //this can be replaced when the data source is mocked in test containers
  let departmentService: DepartmentService;
  beforeEach(() => {
    departmentRepository = mock<DepartmentRepository>();
    departmentService = new DepartmentService(departmentRepository);
  });

  //gets department by id
  describe("getDepartmentById", () => {
    it("getDepartmentById returns department", async () => {
      const mockDepartment = {
       name : "HR",
       id : 1
      };
      when(departmentRepository.findOneById)
        .calledWith(1)
        .mockReturnValue(mockDepartment); //this assets the db call
      const res = await departmentService.getDepartmentById(1);
      expect(departmentRepository.findOneById).toHaveBeenCalledWith(1);
      expect(res).toStrictEqual(mockDepartment);
    });

     it("getDepartmentById throws 404 when not found", async () => {
      when(departmentRepository.findOneById)
        .calledWith(6)
        .mockResolvedValue(null); 
      await expect(departmentService.getDepartmentById(6)).rejects.toBeInstanceOf(HttpException);
    });

  });

  describe("getDepartmentByName", () => {
    it("getDepartmentByName returns department", async () => {
      const mockDepartment = {
        name : "HR",
        id : 1
      };
      when(departmentRepository.findOneByName)
        .calledWith("HR")
        .mockReturnValue(mockDepartment); 
      const res = await departmentService.getDepartmentByName("HR");
      expect(departmentRepository.findOneByName).toHaveBeenCalledWith("HR");
      expect(res).toStrictEqual(mockDepartment);
    });

    it("getDepartmentByName returns no department", async () => {

      when(departmentRepository.findOneByName)
        .calledWith("HR")
        .mockResolvedValue(null); 
      expect(departmentService.getDepartmentByName("HR")).rejects.toBeInstanceOf(HttpException)
      expect(departmentRepository.findOneByName).toHaveBeenCalledWith("HR");
    });

  });

  describe("getAllDepartments", () => {
    it("getAllDepartments returns all departments", async () => {
      const mockDepartments = [
        {
          name : "HR",
          id : 1
        },
        {
         name : "DEV",
         id : 2
        },
      ];

      when(departmentRepository.findMany).mockReturnValue(mockDepartments);
      const res = await departmentService.getAllDepartments();
      expect(res).toStrictEqual(mockDepartments);
    });

    it("getAllDepartments returns null when there are no departments", async() => {
      when(departmentRepository.findMany).mockResolvedValue(null);
      const res = await departmentService.getAllDepartments();
      expect(res).toBeNull();
            expect(departmentRepository.findMany).toHaveBeenCalled();

    })
    it("getAllDepartments returns error", async () => {
      const mockError = "Failed to retrieve departments";
      when(departmentRepository.findMany).mockRejectedValue(new Error(mockError));
      await expect(departmentService.getAllDepartments()).rejects.toBeInstanceOf(HttpException);
        expect(departmentRepository.findMany).toHaveBeenCalled();
    });

  });


  describe("createDepartment", () => {
    it("createDepartment creates a new department", async () => {
      const mockDepartmentValues = {
        name : "CUSTOMER SERVICE",
        id : "7"
      }

      const mockDepartment = new Department();
      mockDepartment.name = mockDepartmentValues.name;
      mockDepartment.id = mockDepartment.id;
      when(departmentRepository.create).calledWith(mockDepartment).mockReturnValue(mockDepartmentValues);
      const res = await departmentService.createDepartment(mockDepartment.name);
      expect(res).toStrictEqual(mockDepartmentValues)
    });

     it("createDepartment fails to create a new department", async () => {
      const mockDepartmentValues = {
        name : "CUSTOMER SERVICE",
        id : "7"
      }

      const mockDepartment = new Department();
      mockDepartment.name = mockDepartmentValues.name;
      mockDepartment.id = mockDepartment.id;

            const mockError = "Connection to database failed";


      when(departmentRepository.create).calledWith(mockDepartment).mockRejectedValue(new Error(mockError));
      await expect(departmentService.createDepartment(mockDepartment.name)).rejects.toBeInstanceOf(HttpException);
      expect(departmentRepository.create).toHaveBeenCalledWith(mockDepartment)
    });

  })


});
