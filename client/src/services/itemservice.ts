import { DepartmentService } from './departmentservice';
import { Item } from './../classes/item';
import { Injectable } from '@angular/core';

DepartmentService.initialize();

@Injectable()
export class ItemService {

  static items: Item[] = [];
  static initialized: boolean = false;

  public static initialize() : void {
    if (this.initialized) return;

    this.items.push(new Item('Cucumber', false, DepartmentService.getByID(6)));
    this.items.push(new Item('Iceberg lettuce', false, DepartmentService.getByID(6)));
    this.items.push(new Item('Cabbage', false, DepartmentService.getByID(6)));
    this.items.push(new Item('Apples', false, DepartmentService.getByID(6)));
    this.items.push(new Item('Tea', false, DepartmentService.getByID(8)));
    this.items.push(new Item('Honey', false, DepartmentService.getByID(9)));

    this.initialized = true;
  }

  public static getItems() : Item[] {
    return this.items;
  }

  public static getItem(name: string) : Item {
    let foundItem = this.items.find((item) => {
      return item.getName() === name;
    });
    
    if (foundItem == undefined)
      return null; 

    return foundItem;
  }

  public static containsItem(target: Item) : boolean {
    let foundItem = this.items.find((item) => {
      return item.getID() == target.getID();
    });

    return (foundItem != undefined && foundItem != null);
  }

  public static addItem(item: Item) : boolean {
    if (this.containsItem(item))
      return false;

    this.items.push(item);
    return true;
  }
}