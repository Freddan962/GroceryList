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

  public getItems() {
    return this.items;
  }

  public addItem(item: Item) {
    this.items.push(item);
  }
}