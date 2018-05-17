import { DepartmentService } from './../../services/departmentservice';
import { ListPage } from './../list/list';
import { NewlistPage } from './../newlist/newlist';
import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { ListService } from './../../services/listservice';
import { List } from './../../classes/list';
import { ItemService } from '../../services/itemservice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  type: string = 'list';
  lists: List[] = [];
  editing: boolean = false;
  editIcon: string = 'build';

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
              public popOverCtrl: PopoverController) {
    this.loadData();
  }

  ionViewWillEnter() : void {
    this.viewCtrl.showBackButton(false);
  }

  onClickCreateFAB() : void {
    this.navCtrl.push(NewlistPage, {
      type: this.type
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

  toggleMore() : void {

  }
}
