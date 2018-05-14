import { Department } from './department';
import { DepartmentService } from './../services/departmentservice';
import { Item } from './item';
import { ItemService } from '../services/itemservice';

export class List {
  name: string;
  items: Item[] = [];

  constructor(_name: string) {
    this.name = _name;
  }

  public isEmpty() : boolean {
    return this.items.length == 0;
  }

  public getName() : string {
    return this.name;
  }

  public getItems() : Item[] { 
    return this.items;
  }

  public addItem(item: Item) : boolean {
    if (this.containsItem(item))
      return this.onItemAlreadyInList(item);

    this.items.push(item);
    return true;
  }

  public removeItem(item: Item) : boolean {
    if (!this.containsItem(item))
      return false;

    this.items.splice(this.items.indexOf(item), 1);
    return true;
  }

  public containsItem(targetItem: Item) : boolean {
    let foundItem = this.items.find((item) => {
      return targetItem.getID() == item.getID();
    });

    return foundItem != null;
  }

  /**
   * getItemsByDepartment()
   * 
   * Returns items arranged by department.
   * 
   * @returns {Object} Example: {
   *  1: [Item item],
   *  41: [Item item item item item...],
   *  9: [Item item item...]
   * }
   * @memberof List
   */
  public getItemsByDepartment() : Object {
    let departmentIDs = this.collectUniqueDepartmentIDs();
    let orderedData = {}
    
    if (departmentIDs == null)
      return null;

    //Arrange items by department ID
    departmentIDs.forEach(id => {
      orderedData[id] = [];
    })

    departmentIDs.forEach(id => {
      this.items.forEach(item => {
        if (id == item.department.getID()) {
          orderedData[id].push(item);
        }
      })
    });

    return orderedData;
  }
  /**
   * collectUniqueDepartmentIDs()
   * 
   * Returns all the unique department IDs sorted by the occurance in 
   * the ItemService.departments array of departments.
   * 
   * @private
   * @param {Item[]} items The items to collect the unique department IDs from
   * @returns {number[]} E.g [3, 4, 91, 21]
   * @memberof List
   */
  public collectUniqueDepartmentIDs() : number[] {
    if (this.items.length == 0)
      return null;
    
    let departments : Department[] = [];
    departments[0] = this.items[0].department;

    this.items.forEach(item => {
      let foundDep = departments.find((dep) => {
        return dep.getID() == item.department.getID();
      })

      if (foundDep != undefined)
        return;

      departments.push(item.department);
    });

    //Sort so that departments IDs are in user ordered order
    departments.sort((a,b) => {
      let indexOne = DepartmentService.getIndexInStorage(a);
      let indexTwo = DepartmentService.getIndexInStorage(b);
      return indexOne - indexTwo;
    })

    // Build ID list
    let idList = [];
    departments.forEach(department => {
      idList.push(department.getID());
    });

    return idList;
  }

  private onItemAlreadyInList(item: Item) : boolean {
    return false;
  }
}