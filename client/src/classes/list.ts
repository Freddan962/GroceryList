import { DepartmentService } from './../services/departmentservice';
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
  //TODO: Sync extensions from laptop
  /**
   * Example return:
   * 
   * { 
   *   0: [1, 2, 3, 4],
   *   7: [1, 2, 3, 4]
   * }
   */
  public getItemsByDepartment() {
    let departmentIDs = [];

    //Collect all used department IDs
    this.items.forEach(itemID => {
      let item = ItemService.getItemByID(itemID);
      let depID = item.getDepartmentID();

      let foundID = departmentIDs.find((id) => {
        return id === depID;
      })

      if (foundID != undefined)
        return;

      departmentIDs.push(depID);
    });

    let orderedData = {}
    
    //Arrange items by department ID
    departmentIDs.forEach(id => {
      orderedData[id] = [];
    })

    departmentIDs.forEach(id => {
      this.items.forEach(item => {
        if (id == ItemService.getItemByID(item).getDepartmentID()) 
          orderedData[id].push(item);
      })
    });

    return orderedData;
  }
}