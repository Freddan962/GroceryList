export class Unit {

  private static entries: number = 0;
  private id: number = 0;

  constructor(private singularName: string, private pluralName: string = singularName) {
    Unit.entries++;
    this.id = Unit.entries;
  }

  public getName(amount: number = 0) : string { 
    return amount > 1 ? this.pluralName : this.singularName;
  }
  public getID() : number { return this.id }
}
