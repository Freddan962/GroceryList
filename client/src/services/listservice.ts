import { ItemService } from './itemservice';
import { Item } from './../classes/item';
import { Injectable } from '@angular/core';
import { List } from './../classes/list';
import { DepartmentService } from './departmentservice';

ItemService.initialize();

@Injectable()
export class ListService {

  static lists: List[] = [];
  static initialized: boolean;

  public static initialize() {
    if (ListService.initialized)
      return;

    let dinnerList = new List('Dinner');
    let bbqList = new List('BBQ');

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

  public static getLists() {
    return ListService.lists;
  }

  public static createList(listName) {
    let newList = new List(listName);
    this.addList(newList);
  }

  public static addList(list: List) {
    ListService.lists.push(list);
  }
}