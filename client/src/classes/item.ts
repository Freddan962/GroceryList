import { ItemService } from './../services/itemservice';
import { DepartmentService } from './../services/departmentservice';
import { Department } from "./department";
import { Unit } from './unit';

export class Item {

  static entries: number = 0;
  private id: number = 0;
  private amount: number;

  constructor(private name: string, public bought: boolean = false, 
              public department: Department = null, private unit: Unit = null) {

    Item.entries++;
    this.id = Item.entries;

    if (this.department == null)
      this.department = DepartmentService.getByID(1);
      
    ItemService.addItem(this);
  }

  public setName(_name: string) { this.name = _name; }
  public setAmount(_amount: number) { this.amount = _amount; }
  public setUnit(_unit: Unit) { this.unit = _unit }

  public getName() : string { return this.name; }
  public getID() : number { return this.id; }
  public getUnit() : Unit { return this.unit; }
  public getAmount() : number { return this.amount; }
}