import { ListPage } from './../list/list';
import { NewlistPage } from './../newlist/newlist';
import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { ListService } from './../../services/listservice';
import { List } from './../../classes/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  views: ViewController;
  popover: PopoverController;
  lists: List[];

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
              public popOverCtrl: PopoverController) {
    this.views = viewCtrl;
    this.popover = popOverCtrl; 
    ListService.initialize();
    this.lists = ListService.getLists();
  }

  ionViewWillEnter() {
    this.views.showBackButton(false);
  }

  onClickCreateFAB() {
    let popover = this.popover.create(NewlistPage);
    popover.present();
  }

  onClickList(listData: List) {
    this.navCtrl.push(ListPage, {
      list: listData
    });
  }
}
