export class Item {

  static entries: number = 0;
  private id: number = 0;

  constructor(private name: string, public bought: boolean = false) {
    Item.entries++;
    this.id = Item.entries;
  }

  public getName() { return this.name }
  public getID() { return this.id }
}