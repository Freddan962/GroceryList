import { DepartmentService } from './../../services/departmentservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray, AlertController } from 'ionic-angular';
import { Department } from '../../classes/department';
import { PromptFactory } from '../../classes/promptfactory';

@IonicPage()
@Component({
  selector: 'page-department',
  templateUrl: 'department.html',
})
export class DepartmentPage {

  departments: Department[] = [];
  editing: boolean = false;
  editIcon: string = 'build';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController) {
    this.departments = DepartmentService.getDepartments();
  }

  /**
   * onClickCreateFAB()
   * 
   * Called when create new department FAB is clicked
   * 
   * @memberof DepartmentPage
   */
  onClickCreateFAB(): void {
    PromptFactory.createTextActionPrompt(this.alertCtrl, 'Create a new department', 'Name', 'Create', (data) => {
      DepartmentService.addDepartment(new Department(data));
    });
  }

  /**
   * toggleEdit()
   * 
   * Toggles edit mode
   * 
   * @memberof DepartmentPage
  */
  toggleEdit(): void {
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
  reorderData(indexes: any): void {
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
  onDeleteDepartment(department: Department): void {
    if (department.getID() == DepartmentService.DEFAULT_DEPARTMENT)
      return;

    DepartmentService.delete(department);
    this.departments = DepartmentService.getDepartments();
  }

  /**
   * onEditDepartmentName()
   * 
   * Called when the client is attempting to edit the department name.
   * 
   * @param {Department} department 
   * @memberof DepartmentPage
  */
  onEditDepartmentName(department: Department): void {
    PromptFactory.createTextUpdatePrompt(this.alertCtrl, 'Update Name', 'Name', (data) => {
      department.setName(data);
    });
  }
}
