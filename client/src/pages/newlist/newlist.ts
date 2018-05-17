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
  type: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController) {
    this.view = viewCtrl;
    this.type = navParams.get('type');
  }

  onCreateClick(name) { 
    if (name == undefined) return;

    if (this.type == 'list') 
      this.onCreateList(name);
    else if (this.type == 'recipe')
      this.onCreateRecipe(name);
  }

  onCreateList(listName) {
    ListService.createList(listName);
    this.view.dismiss();
  }

  onCreateRecipe(recipeName) {

  }
}
