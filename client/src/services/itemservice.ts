import { Item } from './../classes/item';
import { DepartmentService } from './departmentservice';
import { Injectable } from '@angular/core';
import { UnitService } from './unitservice';

@Injectable()
export class ItemService {
  
  static items: Item[] = [];
  static initialized: boolean = false;

  public static initialize() : void {
    if (ItemService.initialized) return;

    let items = [
      { name: 'Cucumber', unit: 1, amount: 0.5, department: 6 },
      { name: 'Iceberg lettuce', unit: 2, amount: 1, department: 6 },
      { name: 'Cabbage', unit: 3, amount: 2, department: 6 },
      { name: 'Apples', unit: 3, amount: 11, department: 6 },
      { name: 'Tea', unit: 1, amount: 1, department: 8 },
      { name: 'Honey', unit: 4, amount: 2, department: 9 },
      { name: 'Oats', unit: 4, amount: 1, department: 6}
    ]
    
    items.forEach((data) => {
      this.initializeItem(data);
    });

    ItemService.initialized = true;
  }

  public static initializeItem(itemData) {
    let department = DepartmentService.getByID(itemData.department);
    let unit = UnitService.getByID(itemData.unit);

    let item = new Item(itemData.name, false, department, unit);
    item.setAmount(itemData.amount);
    
    this.addItem(item);
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

  public static deleteItem(item: Item) : boolean {
    if (!this.containsItem(item))
      return false;

    this.items.splice(this.items.indexOf(item), 1);
  }
}
