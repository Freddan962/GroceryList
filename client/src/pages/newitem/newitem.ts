import { ItemTemplateStore } from './../../classes/itemtemplatestore';
import { UnitService } from './../../services/unitservice';
import { List } from './../../classes/list';
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
  disableUnitSelect: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.list = navParams.get('list');
    this.filterItems('');
    this.departments = DepartmentService.getDepartments();
    this.units = UnitService.getUnits();
  }

  filterItems(strfilter: String) : void {
    this.items = Object.assign([], ItemTemplateStore.getTemplates()); 
    this.disableUnitSelect = false;

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

    if (this.selectedAmount == null || this.selectedAmount < 0) {
      this.presentErrorMessage('Error', 'Invalid amount entered.');
      return;
    }

    let department = DepartmentService.getByID(this.selectedDepartment);
    let unit = UnitService.getByID(this.selectedUnit);
    let amount = Number.parseFloat(this.selectedAmount);
    let name = this.searchInput.trim();

    let template = ItemTemplateStore.getTemplateByName(name);

    //Base the item off the existing template
    if (template != null)
     this.addItemOffTemplate(template, department, amount, unit)
    else
      this.addNewItem(name, department, amount, unit);
    
    this.navCtrl.pop();
  }

  private addItemOffTemplate(template: Item, department: Department, amount: number, unit: Unit): void {
    if (this.list.containsItem(template)) {
      let item = this.list.getItem(template.getName());
      item.addAmount(amount);
    } else {
      this.addNewItem(template.getName(), department, amount, unit);
    }
  }

  private addNewItem(name: string, department: Department, amount: number, unit: Unit): void {
    let item = new Item(name, false, department);
    item.setUnit(unit);
    item.setAmount(amount);
    this.list.addItem(item);  
  }

  onClickItemAlternative(name) : void {
    this.searchInput = name;
    this.filterItems(name);

    let templateItem = ItemTemplateStore.getTemplateByName(name);
    if (templateItem == null) return;

    this.selectedDepartment = templateItem.department.getID();
    this.selectedUnit = templateItem.getUnit().getID();
    this.disableUnitSelect = true;
    this.selectedAmount = templateItem.getAmount();
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
