import { Injectable } from '@angular/core';

@Injectable()
export class ListService {

  static lists = [
    {
      name: "Dinner",
      purchased: 3,
      items: 14
    },
    {
      name: "BBQ-Party",
      purchased: 14,
      items: 131
    }
  ];

  public static getLists() {
    return ListService.lists;
  }

  public static createList(listName, purchasedItems, totalItems) {
    ListService.lists.push({
      name: listName,
      purchased: purchasedItems,
      items: totalItems
    }); 
  }
}