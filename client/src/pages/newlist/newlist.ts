import { ListService } from './../../services/listservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-newlist',
  templateUrl: 'newlist.html',
})
export class NewlistPage {

  view: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController) {
    this.view = viewCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewlistPage');
  }

  onCreateClick(listName) { 
    if (listName == undefined) return;

    ListService.createList(listName);
    this.view.dismiss();
  }
}
