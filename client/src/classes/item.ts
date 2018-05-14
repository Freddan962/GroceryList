import { Department } from "./department";

export class Item {

  static entries: number = 0;
  private id: number = 0;

  constructor(private name: string, public bought: boolean = false, public departmentID: number = 1) {
    Item.entries++;
    this.id = Item.entries;
  }

  public getDepartmentID() { return this.departmentID; }
  public getName() { return this.name }
  public getID() { return this.id }
}