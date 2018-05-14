import { DepartmentService } from './../../services/departmentservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray } from 'ionic-angular';
import { Department } from '../../classes/department';

@IonicPage()
@Component({
  selector: 'page-department',
  templateUrl: 'department.html',
})
export class DepartmentPage {

  departments: Department[] = [];
  editing: boolean = false;
  editIcon: string = 'build';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.departments = DepartmentService.getDepartments();
  }

  /**
   * onClickCreateFAB()
   * 
   * Called when create new department FAB is clicked
   * 
   * @memberof DepartmentPage
   */
  onClickCreateFAB() {

  }

  /**
   * toggleEdit()
   * 
   * Toggles edit mode
   * 
   * @memberof DepartmentPage
  */
  toggleEdit() {
    this.editing = !this.editing;
    this.editIcon = this.editing ? 'close' : 'build'; 
  }

  /**
   * reorderData()
   * 
   * Responsible for reordering of departments in list
   * 
   * @param {*} indexes 
   * @memberof DepartmentPage
  */
  reorderData(indexes: any) {
    this.departments = reorderArray(this.departments, indexes);
  }

  /**
   * onDeleteDepartment()
   * 
   * Called when client is attempting to delete department in list.
   * 
   * @param {Department} department 
   * @returns 
   * @memberof DepartmentPage
  */
  onDeleteDepartment(department: Department) {
    if (department.getID() == DepartmentService.DEFAULT_DEPARTMENT)
      return;

    DepartmentService.delete(department);
    this.departments = DepartmentService.getDepartments();
  }
}
