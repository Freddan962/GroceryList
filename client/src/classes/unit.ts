import { UnitService } from "../services/unitservice";

export class Unit {

  private static entries: number = 0;
  private id: number = 0;
  
  private nextUnit: number = -1;
  private nextTreshold: number = -1;

  constructor(private singularName: string, private pluralName: string = singularName) {
    Unit.entries++;
    this.id = Unit.entries;
  }

  public hasNextUnit(): boolean {
    return this.nextUnit != -1;
  }

  public setNextUnit(id: number): void { this.nextUnit = id; }
  public setNextTreshold(treshhold: number): void {
    this.nextTreshold = treshhold;
  }

  public getNextUnit(): Unit { 
    if (this.nextUnit == -1) return null;
    return UnitService.getByID(this.nextUnit);
  }

  public getNextTreshold(): number { return this.nextTreshold; }
  public getName(amount: number = 0): string { return amount > 1 ? this.pluralName : this.singularName; }
  public getID(): number { return this.id }
}
