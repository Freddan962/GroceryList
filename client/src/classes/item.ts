export class Item {
  name: string;
  public bought: boolean;

  constructor(_name: string, _bought: boolean = false) {
    this.name = _name;
    this.bought = _bought;
  }

  public getName() { return this.name }
}