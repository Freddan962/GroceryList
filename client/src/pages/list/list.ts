import { UnitService } from './../../services/unitservice';
import { List } from './../../classes/list';
import { Item } from './../../classes/item';
import { NewitemPage } from './../newitem/newitem';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ItemService } from '../../services/itemservice';
import { DepartmentService } from '../../services/departmentservice';
import { PromptFactory } from '../../classes/promptfactory';

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

  constructor(private navCtrl: NavController, private navParams: NavParams, 
              private alertCtrl: AlertController, private departmentService: DepartmentService, 
              private unitService: UnitService) {

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
    let message = 'Code: ' + this.list.getShareID(); 
    PromptFactory.createInformationPrompt(this.alertCtrl, 'Share List', message);
  }

  onEditItemName(item: Item) : void {
    PromptFactory.createTextUpdatePrompt(this.alertCtrl, 'Update Name', 'Name', (data) => {
      item.setName(data);
    });
  }

  onEditItemAmount(item: Item) : void {
    PromptFactory.createTextUpdatePrompt(this.alertCtrl, 'Update Amount', 'Amount', (data) => {
      item.setAmount(data);
    });
  }

  onEditItemUnit(item: Item) : void {
    let alert = this.alertCtrl.create();
    alert.setTitle('Update unit');

    let units = UnitService.getUnits();
    units.forEach(unit => {

      alert.addInput({
        type: 'radio',
        label: unit.getName(),
        value: unit.getID().toString(),
        checked: item.getUnit().getID() == unit.getID()
      });
      
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Update',
      handler: (id: any) => {
        item.setUnit(UnitService.getByID(id));
      }
    });

    alert.present();
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
  toggleEdit() : void {
    this.editing = !this.editing;
    this.editIcon = this.editing ? 'close' : 'build'; 
  }

  onDeleteItem(item) : void {
    this.list.removeItem(item);
    ItemService.deleteItem(item);
    this.loadRequiredData();
  }

  onMoveItem(item: any) : void {
    let alert = this.alertCtrl.create();
    alert.setTitle('Update department');

    let departments = DepartmentService.getDepartments();
    departments.forEach(department => {

      alert.addInput({
        type: 'radio',
        label: department.getName(),
        value: department.getID().toString(),
        checked: item.department.getID() == department.getID()
      });
      
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Update',
      handler: (id: any) => {
        item.setDepartment(DepartmentService.getByID(id));
        this.loadRequiredData();
      }
    });

    alert.present();
  }

  onClickClearList(): void {
    PromptFactory.createConfirmationPrompt(this.alertCtrl, 'Confirm', "Are you sure you would like to clear the list?", () => {
      this.list.empty();
      this.loadRequiredData();
    });
  }

  onClickUncheckList(): void {
    PromptFactory.createConfirmationPrompt(this.alertCtrl, 'Confirm', "Are you sure you would like to untick the list?", () => {
      this.list.setItemsBought(false);
    });
  }
} 
