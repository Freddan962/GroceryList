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
  

  lists: List[];

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
              public popOverCtrl: PopoverController) {

    this.lists = ListService.getLists();
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  onClickCreateFAB() {
    this.navCtrl.push(NewlistPage);
  }

  onClickList(listData: List) {
    this.navCtrl.push(ListPage, {
      list: listData
    });
  }
}
