import { Item } from './../../classes/item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-newitem',
  templateUrl: 'newitem.html',
})
export class NewitemPage {

  items: Array<Item>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.filterItems({ target: { value: ''}});
  }

  filterItems(ev: any) {
    this.items = Object.assign([], Item.Items);    
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.items = this.items.filter(function(item) {
        return item.getName().toLowerCase().includes(val.toLowerCase());
      });
    }
  }
}
