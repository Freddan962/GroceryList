import { NewlistPage } from './../newlist/newlist';
import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { ListService } from './../../services/listservice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  views: ViewController;
  popover: PopoverController;
  lists: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
              public popOverCtrl: PopoverController) {
    this.views = viewCtrl;
    this.popover = popOverCtrl; 
    this.lists = ListService.getLists();
  }

  ionViewWillEnter() {
    this.views.showBackButton(false);
  }

  onClickCreateFAB() {
    let popover = this.popover.create(NewlistPage);
    popover.present();
  }
}
