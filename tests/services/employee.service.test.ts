import {when} from 'jest-when';
import { mock, MockProxy } from 'jest-mock-extended'
import EmployeeRepository from "../../repositories/employee.repository"
import EmployeeService from "../../services/employee.service"
import Employee, { EmployeeRole } from '../../entities/employee.entity';

describe('EmployeeService', () => {
    let employeeRepository: MockProxy<EmployeeRepository>; //this can be replaced when the data source is mocked in test containers
    let employeeService: EmployeeService;
    beforeEach(() => {
        employeeRepository = mock<EmployeeRepository>();
        employeeService = new EmployeeService(employeeRepository);
    });
    describe('getEmployeeById', () => {
    it('getEmployeeById returns employee', async() => {
        const mockEmployee = {
            "email": "ria@gmail.com",
            "name": "ria",
            "age": 21,
            "password": "$2b$10$LZ768WtcoS.pUhh1cHf64Osk265lWEuJf/Qm7V6fQXJUySg1hi89.",
            "role": "HR",
            "id": 6,
            "createdAt": "2025-05-22T06:29:26.321Z",
            "updatedAt": "2025-05-22T06:29:26.321Z",
            "deletedAt": null
        };
        when(employeeRepository.findOneById).calledWith(6).mockReturnValue(mockEmployee); //this asserts the db call
        const res = await employeeService.getEmployeeById(6);
        expect(employeeRepository.findOneById).toHaveBeenCalledWith(6);
        expect(res).toStrictEqual(mockEmployee);
    });
    });

});