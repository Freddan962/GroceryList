import { Item } from './../classes/item';

export class ItemTemplateStore {

  private static store = {};

  public static addTemplate(item: Item): void {
    if (this.containsTemplate(item)) return;

    let template = this.createTemplateFromItem(item);
    this.store[template.getName()] = template;
  }

  public static getTemplates(): Item[] { return Object.values(this.store); }

  public static getTemplate(item: Item): Item { 
    let name = Object.keys(this.store).find(name => { return name == item.getName() });
    return name != null ? this.store[name] : null;
  }

  public static getTemplateByName(name: string): Item {
    return Object.keys(this.store).indexOf(name) > -1 ? this.store[name] : null;
  }

  public static updateTemplate(item: Item, perform: any): void {
    let template: Item = this.getTemplate(item);
    perform(template);
  }

  private static containsTemplate(item: Item): boolean {
    return Object.keys(this.store).indexOf(item.getName()) > -1;
  }

  private static createTemplateFromItem(item: Item): Item {
    return new Item(item.getName(), false, item.department, true);
  }
}