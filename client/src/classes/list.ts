import { Item } from './item';
import { ItemService } from '../services/itemservice';

export class List {
  name: string;
  items: number[] = [];

  constructor(_name: string) {
    this.name = _name;
  }

  public getName() {
    return this.name;
  }

  public getItemIDs() {
    return this.items;
  }

  public getItems() {
    let itemObjs = [];
    this.items.forEach(id => {
      itemObjs.push(ItemService.getItemByID(id));
    });

    return itemObjs;
  }

  public addItem(item: number) {
    this.items.push(item);
  }

  public containsItem(item: number) {
    return this.items.indexOf(item) > -1;
  }
}