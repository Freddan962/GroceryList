import { ListService } from './../../services/listservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
/**
 * Generated class for the NewlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

    ListService.createList(listName, 0, 0);
    this.view.dismiss();
  }
}
