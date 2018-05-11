import { Item } from './item';

export class List {
  name: string;
  items: Item[] = [];

  constructor(_name: string) {
    this.name = _name;
  }

  public getName() {
    return this.name;
  }

  public getTotalItems() {
    return this.items.length;
  }

  public addItem(item: Item) {
    this.items.push(item);
  }
}