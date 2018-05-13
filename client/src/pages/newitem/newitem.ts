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
  selectedDepartment: any;
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
    let id = ItemService.getItemID(this.searchInput);
    if (id == null || id == undefined) 
    {
      let item = new Item(this.searchInput);
      ItemService.addItem(item);
      id = item.getID();
    }
    
    if (this.list.containsItem(id)) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Item already exists in list',
        buttons: ['Dismiss']
      });
      alert.present();
      return;
    }

    this.list.addItem(id);
    this.navCtrl.pop();
  }

  onClickItemAlternative(name) {
    this.searchInput = name;
    this.filterItems(name);
  }
}
