import { FloatFormatter } from './floatformatter';
import { ItemService } from './../services/itemservice';
import { DepartmentService } from './../services/departmentservice';
import { Department } from "./department";
import { Unit } from './unit';
import { ItemTemplateStore } from './itemtemplatestore';

export class Item {

  static entries: number = 0;
  private id: number = 0;
  private amount: number;
  private unit: Unit;

  constructor(private name: string, public bought: boolean = false, 
              public department: Department = null, private template: boolean = false) {

    Item.entries++;
    this.id = Item.entries;

    if (this.department == null)
      this.department = DepartmentService.getByID(1);
    
    if (!template) {
      ItemService.addItem(this);
      ItemTemplateStore.addTemplate(this);
    }
  }

  public addAmount(_amount: number): void { 
    this.setAmount(this.getAmount() + _amount);
  }

  private updateUnit(): void {
    if (!this.getUnit().hasNextUnit()) return;

    if (this.getAmount() >= this.getUnit().getNextTreshold()) {
      let newAmount = this.getAmount()/this.getUnit().getNextTreshold();
      this.setUnit(this.getUnit().getNextUnit());
      this.setAmount(newAmount);
    }
  }

  public setAmount(_amount: number) : void { 
    this.amount = _amount;
    this.updateUnit();

    if (this.template) return;
    ItemTemplateStore.updateTemplate(this, (template) => { template.setAmount(this.amount) })
  }

  public setDepartment(_department: Department) : void { 
    this.department = _department
    
    if (this.template) return;
    ItemTemplateStore.updateTemplate(this, (template) => { template.setDepartment(this.department) })
  }

  public setName(_name: string) : void { 
    this.name = _name; 

    if (this.template) return;
    ItemTemplateStore.updateTemplate(this, (template) => { template.setName(this.name); });
  }
  
  public setUnit(_unit: Unit) : void { 
    this.unit = _unit

    if (this.template) return;
    ItemTemplateStore.updateTemplate(this, (template) => { template.setUnit(this.unit) });
  }

  public getName() : string { return this.name; }
  public getID() : number { return this.id; }
  public getUnit() : Unit { return this.unit; }
  public getAmount() : number { return this.amount; }
}