import { ItemService } from './../../services/itemservice';
import { NewitemPage } from './../newitem/newitem';
import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  list: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.list = navParams.get('list');
    this.navCtrl = navCtrl;
  }

  onClickCreateFAB() {
    this.navCtrl.push(NewitemPage, {
      list: this.list
    });
  }
}
