import { UnitService } from './../../services/unitservice';
import { List } from './../../classes/list';
import { ItemService } from './../../services/itemservice';
import { DepartmentService } from './../../services/departmentservice';
import { Department } from './../../classes/department';
import { Item } from './../../classes/item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Unit } from '../../classes/unit';

@IonicPage()
@Component({
  selector: 'page-newitem',
  templateUrl: 'newitem.html',
})
export class NewitemPage {

  items: Array<Item>;
  departments: Array<Department>;
  units: Array<Unit>
  selectedDepartment: any = 1;
  selectedUnit: any = 1;
  selectedAmount: any = 1;
  searchInput: any;
  list: List;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.list = navParams.get('list');
    this.filterItems('');
    this.departments = DepartmentService.getDepartments();
    this.units = UnitService.getUnits();
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

    if (this.selectedUnit == null || this.selectedUnit < 1 || this.selectedUnit > this.units.length) {
      this.presentErrorMessage('Error', 'Invalid Unit selected.');
      return;
    }

    if (this.selectedAmount == null || this.selectedAmount < 1) {
      this.presentErrorMessage('Error', 'Invalid amount entered.');
      return;
    }

    let item = ItemService.getItem(this.searchInput.trim());
    let department = DepartmentService.getByID(this.selectedDepartment);
    let unit = UnitService.getByID(this.selectedUnit);

    if (item == null)
      item = new Item(this.searchInput.trim(), false, department);

    item.setAmount(this.selectedAmount);
    item.setUnit(unit);

    this.list.addItem(item);
    this.navCtrl.pop();
  }

  onClickItemAlternative(name) : void {
    this.searchInput = name;
    this.filterItems(name);

    let foundItem = ItemService.getItem(name);
    if (foundItem == null) return;

    this.selectedDepartment = foundItem.department.getID();
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
