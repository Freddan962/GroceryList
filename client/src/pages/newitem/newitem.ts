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
  selectedDepartment: any = null;
  searchInput: any;
  list: List;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.list = navParams.get('list');
    this.filterItems('');
    this.departments = DepartmentService.getDepartments();
  }

  filterItems(strfilter: String) {
    this.items = Object.assign([], ItemService.getItems());    

    if (strfilter.trim() !== '') {
      this.items = this.items.filter(function(item) {
        return item.getName().toLowerCase().includes(strfilter.toLowerCase());
      });
    }
  }

  onCreateClick() {
    if (this.selectedDepartment == null) {
      this.presentErrorMessage('Error', 'You must select a department');
      return;
    }

    let id = ItemService.getItemID(this.searchInput);
    if (id == null || id == undefined) 
    {
      let item = new Item(this.searchInput);
      ItemService.addItem(item);
      id = item.getID();
    }
    
    if (this.list.containsItem(id)) {
      this.presentErrorMessage('Error', 'Item already exists in list');
      return;
    }

    this.list.addItem(id);
    this.navCtrl.pop();
  }

  onClickItemAlternative(name) {
    this.searchInput = name;
    this.filterItems(name);
  }

  presentErrorMessage(_title: string, _subtitle: string) {
    let alert = this.alertCtrl.create({
      title: _title,
      subTitle: _subtitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
