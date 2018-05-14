import { DepartmentService } from './../services/departmentservice';
import { Item } from './item';
import { ItemService } from '../services/itemservice';

export class List {
  name: string;
  items: Item[] = [];

  constructor(_name: string) {
    this.name = _name;
  }

  public getName() : string {
    return this.name;
  }

  public getItems() : Item[] { 
    return this.items;
  }

  public addItem(item: Item) : void {
    this.items.push(item);
  }

  public containsItem(targetItem: Item) : boolean {
    let foundItem = this.items.find((item) => {
      return targetItem.getID() == item.getID();
    });

    return (foundItem != undefined || foundItem != null);
  }
  //TODO: Sync extensions from laptop
  /**
   * Example return:
   * 
   * { 
   *   0: [Item, Item, Item, Item],
   *   7: [Item, Item]
   * }
   */
  public getItemsByDepartment() : Object {
    let departmentIDs = [];

    //Collect all used department IDs
    this.items.forEach(item => {
      let depID = item.department.getID();

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
        if (id == item.department.getID()) 
          orderedData[id].push(item);
      })
    });

    return orderedData;
  }
}