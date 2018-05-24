import { Department } from './department';
import { DepartmentService } from './../services/departmentservice';
import { Item } from './item';
import { ItemService } from '../services/itemservice';
import moment from 'moment';

export class List {
  items: Item[] = [];
  private edited: Date;

  constructor(private name: string, private shareID: string = '') {
    this.edited = new Date();
  }

  public getEditedFormat(): string {
    return moment(this.edited).fromNow() != null ? moment(this.edited).fromNow() : ".. ago"
  }

  public isEmpty(): boolean {
    return this.items.length == 0;
  }

  public addItem(item: Item): boolean {
    if (this.containsItem(item))
      return this.onItemAlreadyInList(item);

    this.items.push(item);
    this.onEdited();    
    return true;
  }

  public removeItem(item: Item): boolean {
    if (!this.containsItem(item))
      return false;

    this.items.splice(this.items.indexOf(item), 1);
    this.onEdited();
    return true;
  }

  public containsItem(targetItem: Item): boolean {
    return this.getItem(targetItem.getName()) != null;
  }

  public getItem(name: string): Item {
    return this.items.find((item) => { return name == item.getName(); });
  }

  public getBoughtItems(): Item[] {
    return this.items.filter((item) => {
      return item.bought == true;
    })
  }

  public isBought(): boolean {
    if (this.items.length == 0) return false;
    let bought: boolean = true;

    this.items.forEach(item => { 
      if (item.bought == false) {
        bought = false;
        return;
      } 
    });

    return bought;
  }

  public setItemsBought(bought: boolean): void { 
    this.items.forEach(item => { item.bought = bought; });
  }

  public empty(): void {
    Array.from(this.items).forEach(item => {  this.removeItem(item); });
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
  public getItemsByDepartment(): Object {
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
  public collectUniqueDepartmentIDs(): number[] {
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

  private onItemAlreadyInList(item: Item): boolean {
    return false;
  }

  private onEdited(): void { 
    this.updateEditedDate();
  }

  private updateEditedDate(): void {
    this.edited = new Date();
  }

  /*
  ########################
  ## GETTERS & SETTERS  ##
  ########################
  */

 public getEdited(): Date { return this.edited; }
 public setEdited(_edited: Date): void { this.edited = _edited; }
 public setName(_name: string): void { this.name = _name; }
 public getName(): string { return this.name; }
 public getItems(): Item[] { return this.items; }
 public setShareID(id: string): void { this.shareID = id; }
 public getShareID(): string { return this.shareID; }

}