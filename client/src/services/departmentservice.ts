import { ItemService } from './itemservice';
import { Department } from './../classes/department';
import { Injectable } from '@angular/core';

@Injectable()
export class DepartmentService {

  static departments: Department[] = [];
  static initialized: boolean = false;
  static DEFAULT_DEPARTMENT: number = 1;

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

  /**
   * addDepartment()
   * 
   * Adds a department to the department service
   * 
   * @static
   * @param {Department} department The department to add
   * @memberof DepartmentService
  */
  public static addDepartment(department: Department) : void {
     DepartmentService.departments.push(department);
  }

  /**
   * getByID()
   * 
   * @static
   * @param {number} id The ID of the department to fetch
   * @returns {Department} The found department
   * @memberof DepartmentService
  */
  public static getByID(id: number) : Department {
    let department = this.departments.find((department) => {
      return department.getID() == id;
    });

    return department;
  }

  /**
   * getIndexInStorage()
   * 
   * Returns the index which the provided department occupies 
   * in DepartmentService.departments collection
   * 
   * @static
   * @param {Department} department The department to find the index of
   * @returns {number} The index of the department
   * @memberof DepartmentService
  */
  public static getIndexInStorage(department: Department) : number {
    return DepartmentService.departments.indexOf(department);
  }

  /**
   * delete()
   * 
   * Deletes the department and sets all items under this department to uncategorized.
   * 
   * @static
   * @param {Department} department The department to delete.
   * @memberof DepartmentService
  */
  public static delete(department: Department) : void {
    if (department.getID() == DepartmentService.DEFAULT_DEPARTMENT)
      return;

    ItemService.getItems().forEach((item) => {
      if (item.department.getID() != department.getID())
        return;

      item.department = DepartmentService.getByID(DepartmentService.DEFAULT_DEPARTMENT); 
    });

    DepartmentService.departments.splice(this.getIndexInStorage(department), 1);
  }
}