import { List } from './../../classes/list';
import { Item } from './../../classes/item';
import { DepartmentService } from './../../services/departmentservice';
import { NewitemPage } from './../newitem/newitem';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemService } from '../../services/itemservice';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  list: List;
  arrangedData: any;
  departmentIDs: any;
  editing: boolean = false;
  editIcon: string = 'build';

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public departmentService: DepartmentService) {

    this.list = navParams.get('list');
  }

  ionViewWillEnter() {
    this.loadRequiredData();
  }

  onClickCreateFAB() : void {
    this.navCtrl.push(NewitemPage, {
      list: this.list
    });
  }

  onClickShareList() : void {
    //TODO
  }

  loadRequiredData() : void {
    this.arrangedData = this.list.getItemsByDepartment();  
    this.departmentIDs = this.list.collectUniqueDepartmentIDs();
  }

  getDepartmentName(id) : string {
    return DepartmentService.getByID(parseInt(id)).getName();
  }

  getItems(id) : Item[] {
    return this.arrangedData[id];
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

  foo() {
    console.log("test");
  }

  onDeleteItem(item) {
    console.log("DELETING ITEM: " + item.getName());
    this.list.removeItem(item);
    ItemService.deleteItem(item);
    this.loadRequiredData();
  }
}
