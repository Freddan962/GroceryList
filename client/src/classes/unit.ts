export class Unit {

  private static entries: number = 0;
  private id: number = 0;

  constructor(private name: string) {
    Unit.entries++;
    this.id = Unit.entries;
  }

  public getName() : string { return this.name }
  public getID() : number { return this.id }
}
