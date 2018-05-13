import { Department } from './../classes/department';
import { Injectable } from '@angular/core';

@Injectable()
export class DepartmentService {

  static departments: Department[] = [];
  static initialized: boolean;

  public static initialize() {
    if (DepartmentService.initialized) return;

    DepartmentService.departments.push(new Department('Bakery'));
    DepartmentService.departments.push(new Department('Meat'));
    DepartmentService.departments.push(new Department('Frozen'));
    DepartmentService.departments.push(new Department('Dairy'));
    DepartmentService.departments.push(new Department('Produce'));
    DepartmentService.departments.push(new Department('Seafood'));
    DepartmentService.departments.push(new Department('Floral'));
    DepartmentService.departments.push(new Department('Deli'));
  }

  public static getDepartments() {
    return DepartmentService.departments;
  }

  public static addDepartment(department: Department) {
    DepartmentService.departments.push(department);
  }
}