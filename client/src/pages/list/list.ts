import { Item } from './../../classes/item';
import { DepartmentService } from './../../services/departmentservice';
import { ItemService } from './../../services/itemservice';
import { NewitemPage } from './../newitem/newitem';
import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  list: any;
  arrangedData: any;
  departmentIDs: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public departmentService: DepartmentService) {

    this.list = navParams.get('list');
    this.arrangedData = this.list.getItemsByDepartment();
    this.departmentIDs = Object.keys(this.arrangedData);
  }

  onClickCreateFAB() : void {
    this.navCtrl.push(NewitemPage, {
      list: this.list
    });
  }

  getDepartmentName(id) : string {
    return DepartmentService.getByID(parseInt(id)).getName();
  }

  getItems(id) : Item[] {
    return this.arrangedData[id];
  }
}
