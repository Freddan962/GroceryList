import { List } from './../../classes/list';
import { ItemService } from './../../services/itemservice';
import { DepartmentService } from './../../services/departmentservice';
import { Department } from './../../classes/department';
import { Item } from './../../classes/item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-newitem',
  templateUrl: 'newitem.html',
})
export class NewitemPage {

  items: Array<Item>;
  departments: Array<Department>;
  selectedDepartment: any = 1;
  searchInput: any;
  list: List;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.list = navParams.get('list');
    this.filterItems('');
    this.departments = DepartmentService.getDepartments();
  }

  filterItems(strfilter: String) : void {
    this.items = Object.assign([], ItemService.getItems());   

    if (strfilter.trim() !== '') {
      this.items = this.items.filter(function(item) {
        return item.getName().toLowerCase().includes(strfilter.toLowerCase());
      });
    }
  }

  onCreateClick() : void {
    if (!this.searchInput || 0 === this.searchInput.length) {
      this.presentErrorMessage('Error', 'You must provide a item name.');
      return;
    }

    if (this.selectedDepartment == null) {
      this.presentErrorMessage('Error', 'You must select a department.');
      return;
    }

    console.log("Department ID: " + this.selectedDepartment);

    let item = ItemService.getItem(this.searchInput.trim());
    if (item == null)
      item = new Item(this.searchInput.trim(), false, DepartmentService.getByID(this.selectedDepartment));

    this.list.addItem(item);
    this.navCtrl.pop();
  }

  onClickItemAlternative(name) : void {
    this.searchInput = name;
    this.filterItems(name);
  }

  presentErrorMessage(_title: string, _subtitle: string) : void {
    let alert = this.alertCtrl.create({
      title: _title,
      subTitle: _subtitle,
      buttons: ['Dismiss']
    });

    alert.present();
  }
}
