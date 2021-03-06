import { PromptFactory } from './../../classes/promptfactory';
import { DepartmentService } from './../../services/departmentservice';
import { ListPage } from './../list/list';
import { Component } from '@angular/core';
import { NavController, ViewController, reorderArray, AlertController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { ListService } from './../../services/listservice';
import { List } from './../../classes/list';
import { ItemService } from '../../services/itemservice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  lists: List[] = [];
  editing: boolean = false;
  editIcon: string = 'build';

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
              public popOverCtrl: PopoverController, public alertCtrl: AlertController) {
    this.loadData();
  }

  onClickCreateFAB() : void {
    PromptFactory.createTextActionPrompt(this.alertCtrl, 'Create a new list', 'Name', 'Create', (data) => {
      ListService.createList(data);
    });
  }

  onClickList(listData: List) : void {
    if (this.editing)
      return;

    this.navCtrl.push(ListPage, {
      list: listData
    });
  }

  onDeleteList(list: List) : void {  
    ListService.deleteList(list);
    this.loadData();
  }

  loadData() : void {
    this.lists = ListService.getLists();
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

   /**
   * reorderData()
   * 
   * Responsible for reordering of lists
   * 
   * @param {*} indexes 
   * @memberof HomePage
  */
  reorderData(indexes: any) : void {
    this.lists = reorderArray(this.lists, indexes);
  }
  
  onClickImportList() : void {
    PromptFactory.createTextActionPrompt(this.alertCtrl, 'Import List', 'Code', 'Import', (data) => { 
      ListService.importList(data);
    });
  }

  onEditListName(list: List): void {
    PromptFactory.createTextUpdatePrompt(this.alertCtrl, 'Update Name', 'Name', (data) => {
      list.setName(data);
    });
  }
}
