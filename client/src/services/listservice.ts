import { ItemService } from './itemservice';
import { Item } from './../classes/item';
import { Injectable } from '@angular/core';
import { List } from './../classes/list';

@Injectable()
export class ListService {

  static lists: List[] = [];
  static initialized: boolean;

  public static initialize() {
    if (ListService.initialized)
      return;

    let dinnerList = new List('Dinner');
    let bbqList = new List('BBQ');

    dinnerList.addItem(1);
    dinnerList.addItem(2);
    dinnerList.addItem(3);
    dinnerList.addItem(4);
    dinnerList.addItem(5);
    dinnerList.addItem(6);

    bbqList.addItem(2);
    bbqList.addItem(3);
    bbqList.addItem(1);
    bbqList.addItem(4);
    bbqList.addItem(5);
    bbqList.addItem(6);

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