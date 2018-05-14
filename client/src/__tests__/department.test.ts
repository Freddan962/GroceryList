import { DepartmentService } from './../services/departmentservice';
import { Department } from './../classes/department';
import { ItemService } from '../services/itemservice';
import { ListService } from '../services/listservice';

DepartmentService.initialize();
ItemService.initialize();
ListService.initialize();

describe('Department service functionality', () => {
  test('Should find the department with the correct ID', (done) => {
    expect(DepartmentService.getByID(1).getID()).toBe(1);
    done();
  });
});