export class Item {
  name: string;
  public purchased: boolean;

  constructor(_name: string) {
    this.name = _name;
  }

  public getName() { return this.name }
}