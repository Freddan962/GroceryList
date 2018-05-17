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
  }

  onCreateClick(name) { 
    if (name == undefined) return;

    this.onCreateList(name);
  }

  onCreateList(listName) {
    ListService.createList(listName);
    this.view.dismiss();
  }
}
