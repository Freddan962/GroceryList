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

  test('Should reorder by IDs correctly', (done) => {
    let targetOne = 2;
    let targetTwo = 1;

    expect(DepartmentService.getDepartments()[targetOne - 1].getID()).toBe(targetOne);
    expect(DepartmentService.getDepartments()[targetTwo - 1].getID()).toBe(targetTwo);

    DepartmentService.reorderByIDs(targetOne, targetTwo);
    expect(DepartmentService.getDepartments()[targetOne - 1].getID()).toBe(targetTwo);
    expect(DepartmentService.getDepartments()[targetTwo - 1].getID()).toBe(targetOne);
    done();
  });
});