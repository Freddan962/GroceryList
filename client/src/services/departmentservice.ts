import { Department } from './../classes/department';
import { Injectable } from '@angular/core';

@Injectable()
export class DepartmentService {

  static departments: Department[] = [];
  static initialized: boolean = false;

  public static initialize() {
    if (DepartmentService.initialized) return;

     DepartmentService.addDepartment(new Department('Uncategorized'));    
     DepartmentService.addDepartment(new Department('Bakery'));
     DepartmentService.addDepartment(new Department('Meat'));
     DepartmentService.addDepartment(new Department('Frozen'));
     DepartmentService.addDepartment(new Department('Dairy'));
     DepartmentService.addDepartment(new Department('Produce'));
     DepartmentService.addDepartment(new Department('Seafood'));
     DepartmentService.addDepartment(new Department('Floral'));
     DepartmentService.addDepartment(new Department('Deli'));

    DepartmentService.initialized = true;
  }

  public static getDepartments() : Department[] {
    return DepartmentService.departments;
  }

  public static addDepartment(department: Department) : void {
     DepartmentService.departments.push(department);
  }

  public static getByID(id: number) : Department {
    let department = this.departments.find((department) => {
      return department.getID() == id;
    });

    return department;
  }
}