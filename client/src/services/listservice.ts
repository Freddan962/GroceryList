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

    dinnerList.addItem(new Item('Cucumber'));
    dinnerList.addItem(new Item('Iceberg lettuce'));
    dinnerList.addItem(new Item('Cabbage'));
    dinnerList.addItem(new Item('Apples'));
    dinnerList.addItem(new Item('Tea'));
    dinnerList.addItem(new Item('Honey'));

    bbqList.addItem(new Item('Iceberg lettuce'));
    bbqList.addItem(new Item('Cucumber'));
    bbqList.addItem(new Item('Iceberg lettuce'));
    bbqList.addItem(new Item('Cabbage'));
    bbqList.addItem(new Item('Apples'));
    bbqList.addItem(new Item('Tea'));
    bbqList.addItem(new Item('Honey'));

    ListService.lists.push(dinnerList);
    ListService.lists.push(bbqList);

    this.initialized = true;
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