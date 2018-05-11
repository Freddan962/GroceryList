export class Item {
  name: string;

  constructor(_name: string) {
    this.name = _name;
  }

  public getName() { return this.name }
}