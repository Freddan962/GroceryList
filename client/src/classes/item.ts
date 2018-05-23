import { ItemService } from './../services/itemservice';
import { DepartmentService } from './../services/departmentservice';
import { Department } from "./department";
import { Unit } from './unit';

export class Item {

  static entries: number = 0;
  private id: number = 0;
  private amount: number;
  private unit: Unit;

  constructor(private name: string, public bought: boolean = false, 
              public department: Department = null) {

    Item.entries++;
    this.id = Item.entries;

    if (this.department == null)
      this.department = DepartmentService.getByID(1);
      
    ItemService.addItem(this);
  }

  public addAmount(_amount: number): void { this.amount += _amount; }

  public setDepartment(_department: Department) : void { this.department = _department }
  public setName(_name: string) : void { this.name = _name; }
  public setAmount(_amount: number) : void { this.amount = _amount; }
  public setUnit(_unit: Unit) : void { this.unit = _unit }

  public getName() : string { return this.name; }
  public getID() : number { return this.id; }
  public getUnit() : Unit { return this.unit; }
  public getAmount() : number { return this.amount; }
}