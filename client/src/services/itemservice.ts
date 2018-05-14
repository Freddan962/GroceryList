import { Item } from './../classes/item';
import { Injectable } from '@angular/core';

@Injectable()
export class ItemService {

  static items: Item[] = [];
  static initialized: boolean = false;

  public static initialize() {
    if (this.initialized) return;

    this.items.push(new Item('Cucumber', false, 6));
    this.items.push(new Item('Iceberg lettuce', false, 6));
    this.items.push(new Item('Cabbage', false, 6));
    this.items.push(new Item('Apples', false, 6));
    this.items.push(new Item('Tea', false, 8));
    this.items.push(new Item('Honey', false, 9));

    this.initialized = true;
  }

  public static getItems() {
    return this.items;
  }

  public static getItemByID(id: number) {
    return this.items.find((item) => {
      return item.getID() === id;
    });
  }

  public static getItemID(name: string) {
    let foundItem = this.items.find((item) => {
      return item.getName() === name;
    });
    
    if (foundItem == undefined)
      return null; 

    return foundItem.getID();
  }

  public static addItem(item: Item) {
    if (this.getItemID(item.getName()))
    {
      throw new Error('Item with name: ' + item.getName() + ' already exists');
    }

    this.items.push(item);
  }
}