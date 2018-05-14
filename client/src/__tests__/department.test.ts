import { DepartmentService } from './../services/departmentservice';
import { Department } from './../classes/department';

DepartmentService.initialize();

describe('Department service functionality', () => {
  test('Should find the department with the correct ID', (done) => {
    expect(DepartmentService.getByID(1).getID()).toBe(1);
    done();
  });
});