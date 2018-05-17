import { List } from './../../classes/list';
import { Item } from './../../classes/item';
import { DepartmentService } from './../../services/departmentservice';
import { NewitemPage } from './../newitem/newitem';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
              public departmentService: DepartmentService, public alertCtrl: AlertController) {

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
    let alert = this.alertCtrl.create({
      title: 'Share list',
      message: 'Code: ' + this.list.getShareID(),
      buttons: [
        {
          text: 'Done'
        }
      ]
    });

    alert.present();
  }

  onEditItemName(item: Item) : void {
    let alert = this.alertCtrl.create({
      title: 'Update name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Update',
          handler: data => {
            item.setName(data.name);
          }
        }
      ]
    });
    alert.present();
  }

  onEditItemAmount(item: Item) : void {
    let alert = this.alertCtrl.create({
      title: 'Update amount',
      inputs: [
        {
          name: 'amount',
          placeholder: 'Amount'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Update',
          handler: data => {
            item.setAmount(data.amount);
          }
        }
      ]
    });

    alert.present();
  }

  onEditItemUnit(item: Item) : void {
    let alert = this.alertCtrl.create();
    alert.setTitle('Update unit');

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
      handler: (data: any) => {
        //https://github.com/ionic-team/ionic/blob/v3/demos/src/alert/pages/page-one/page-one.ts
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
  toggleEdit() {
      this.editing = !this.editing;
      this.editIcon = this.editing ? 'close' : 'build'; 
  }

  onDeleteItem(item) {
    this.list.removeItem(item);
    ItemService.deleteItem(item);
    this.loadRequiredData();
  }
}
