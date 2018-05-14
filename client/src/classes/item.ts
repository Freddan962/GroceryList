import { ItemService } from './../services/itemservice';
import { DepartmentService } from './../services/departmentservice';
import { Department } from "./department";

export class Item {

  static entries: number = 0;
  private id: number = 0;

  constructor(private name: string, public bought: boolean = false, public department: Department = null) {
    Item.entries++;
    this.id = Item.entries;

    if (this.department == null)
      this.department = DepartmentService.getByID(1);
      
    ItemService.addItem(this);
  }

  public getName() : string { return this.name }
  public getID() : number { return this.id }
}