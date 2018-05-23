export class Department {

  static entries: number = 0;
  private id: number = 0;

  constructor(private name: string, public bought: boolean = false) {
    Department.entries++;
    this.id = Department.entries;
  }

  public setName(_name: string): void { this.name = _name; }
  public getName(): string { return this.name; }
  public getID():number { return this.id; }
}