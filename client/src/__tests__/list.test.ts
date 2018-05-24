import { DepartmentService } from './../services/departmentservice';
import { ItemService } from './../services/itemservice';
import { ListService } from './../services/listservice';
import { List } from './../classes/list';
import { Item } from './../classes/item';
import { UnitService } from '../services/unitservice';

UnitService.initialize();
DepartmentService.initialize();
ItemService.initialize();
ListService.initialize();

describe('Test lists', () => {
  test('Should create a new list with specific name', (done) => {
    let list = new List('Lunch');
    expect(list.getName()).toBe('Lunch');
    done();
  });

  test('Should contain the correct amount of items', (done) => {
    let list = new List('Lunch');
    expect(list.getItems().length).toBe(0);
    list.addItem(new Item('Broccoli'));
    expect(list.getItems().length).toBe(1);
    done();
  });

  test('Should properly handle add item', (done) => {
    let list = new List('Lunch');

    let item = new Item('Chicken breast')
    ItemService.addItem(item);
    list.addItem(item);

    item = new Item('Rice');
    ItemService.addItem(item);    
    list.addItem(item);
    
    item = new Item('Peanut butter');
    ItemService.addItem(item);
    list.addItem(item);

    let items = list.getItems();
    
    expect(items[2].getName()).toBe('Peanut butter');
    done();
  });

  test('Should properly sort items by department', (done) => {
    let list = new List('SortedList');

    let itemData = [
      { name: 'Foo', department: 1 }, 
      { name: 'Bar',department: 1 },
      { name: 'FooBar',department: 2 },
      { name: 'BarFoo', department: 3 },
    ];

    let items = [];
    itemData.forEach((data) => {
      items.push(new Item(data.name, false, DepartmentService.getByID(data.department)));
    });

    items.forEach((item) => {
      list.addItem(item);
    })

    list.addItem(items[3]);

    let arranged = list.getItemsByDepartment();
    expect(arranged[1].length).toBe(2);
    expect(arranged[2].length).toBe(1);
    expect(arranged[3].length).toBe(1);
    done();
  }); 

  test('Should properly check if item already exists in list', (done) => {
    let list = new List('SortedList');
    let item = new Item('Foo');
    
    list.addItem(item);
    expect(list.containsItem(item)).toBe(true);
    done();
  });

  test('Should properly detect lists where all items are bought', (done) => {
    let list = new List('Foo');

    let item = new Item('Foo');
    let item2 = new Item('Bar');

    list.addItem(item);
    list.addItem(item2);

    expect(list.isBought()).toBe(false);
    item.bought = true;
    expect(list.isBought()).toBe(false);
    item2.bought = true;
    expect(list.isBought()).toBe(true);
    done();
  });

  test('Should not list empty lists as bought', (done) => {
    let list = new List('Foo');
    expect(list.isBought()).toBe(false);
    done();
  });
});

describe('Test ListService ', () => {
  test('Should handle direct list creation', (done) => {
    let initialCount = ListService.getLists().length;
    ListService.createList('2018-02-3');
    expect(ListService.getLists().length).toBe(initialCount+1);
    done();
  })

  test('Should handle adding list', (done) => {
    let initialCount = ListService.getLists().length;
    let list = new List('Dinner');
    ListService.addList(list);
    expect(ListService.getLists().length).toBe(initialCount+1);
    done();
  });
});
