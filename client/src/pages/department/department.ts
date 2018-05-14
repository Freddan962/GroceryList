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

  onClickCreateFAB() {

  }

  toggleEdit() {
    this.editing = !this.editing;
    this.editIcon = this.editing ? 'close' : 'build'; 
  }

  reorderData(indexes: any) {
    this.departments = reorderArray(this.departments, indexes);

    //let departmentIDOne = this.departments[indexes.from].getID();
    //let departmentIDTwo = this.departments[indexes.to].getID();
    //DepartmentService.reorderByIDs(departmentIDOne, departmentIDTwo);
  }
}
