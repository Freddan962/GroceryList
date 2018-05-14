import { Item } from './../classes/item';
import { DepartmentService } from './departmentservice';
import { Injectable } from '@angular/core';

@Injectable()
export class ItemService {
  
  static items: Item[] = [];
  static initialized: boolean = false;

  public static initialize() : void {
    if (ItemService.initialized) return;
    
    this.addItem(new Item('Cucumber', false, DepartmentService.getByID(6)));
    this.addItem(new Item('Iceberg lettuce', false, DepartmentService.getByID(6)));
    this.addItem(new Item('Cabbage', false, DepartmentService.getByID(6)));
    this.addItem(new Item('Apples', false, DepartmentService.getByID(6)));
    this.addItem(new Item('Tea', false, DepartmentService.getByID(8)));
    this.addItem(new Item('Honey', false, DepartmentService.getByID(9)));
    
    ItemService.initialized = true;
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
    
    if (foundItem == undefined || foundItem == null)
    return false;
    
    return foundItem.getName() === target.getName();
  }
  
  public static addItem(item: Item) : boolean {
    if (this.containsItem(item))
    return false;
    
    this.items.push(item);
    return true;
  }
}
