import { NewitemPage } from './../newitem/newitem';
import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  list: any;
  popover: PopoverController;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public popoverCtrl: PopoverController) {
    this.list = navParams.get('list');
    this.popover = popoverCtrl;
  }

  onClickCreateFAB() {
    let popover = this.popover.create(NewitemPage);
    popover.present();
  }
}
