import { ItemService } from './itemservice';
import { Item } from './../classes/item';
import { Injectable } from '@angular/core';
import { List } from './../classes/list';
import { DepartmentService } from './departmentservice';

@Injectable()
export class ListService {

  static lists: List[] = [];
  static initialized: boolean;

  public static initialize() : void {
    if (ListService.initialized)
      return;

    let dinnerList = new List('Dinner', 'XCK27014');
    let bbqList = new List('BBQ', 'JMLP2312');

    dinnerList.addItem(ItemService.getItems()[0]);
    dinnerList.addItem(ItemService.getItems()[1]);
    dinnerList.addItem(ItemService.getItems()[2]);
    dinnerList.addItem(ItemService.getItems()[3]);
    dinnerList.addItem(ItemService.getItems()[4]);
    dinnerList.addItem(ItemService.getItems()[5]);

    bbqList.addItem(ItemService.getItems()[0]);
    bbqList.addItem(ItemService.getItems()[1]);
    bbqList.addItem(ItemService.getItems()[1]);
    bbqList.addItem(ItemService.getItems()[2]);
    bbqList.addItem(ItemService.getItems()[2]);
    bbqList.addItem(ItemService.getItems()[0]);

    ListService.lists.push(dinnerList);
    ListService.lists.push(bbqList);

    ListService.initialized = true;
  }

  public static getLists() : List[] {
    return ListService.lists;
  }

  public static createList(listName) : void {
    let newList = new List(listName);
    this.addList(newList);
  }

  public static addList(list: List) : void {
    ListService.lists.push(list);
  }

  public static deleteList(list: List) : boolean {
    let index = ListService.lists.indexOf(list);
    if (index == -1) 
      return false;

    ListService.lists.splice(index, 1);

    return true;
  }

  public static importList(code: string) : boolean {
    //Handle import logic

    return true;
  }
}