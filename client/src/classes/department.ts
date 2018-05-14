export class Department {

  static entries: number = 0;
  private id: number = 0;

  constructor(private name: string, public bought: boolean = false) {
    Department.entries++;
    this.id = Department.entries;
  }
  public getName() { return this.name; }
  public getID() { return this.id; }
}