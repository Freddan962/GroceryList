export class Item {
  static Items: Array<Item> = [];
  
  name: string;
  public bought: boolean;

  constructor(_name: string, _bought: boolean = false) {
    this.name = _name;
    this.bought = _bought;

    this.addSelfToItemsContainer();
  }

  private addSelfToItemsContainer() {
    if (Item.Items.filter(item => item.getName() === this.name).length > 0) 
      return;
    
    Item.Items.push(this);
  }

  public getName() { return this.name }
}