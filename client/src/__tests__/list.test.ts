import { DepartmentService } from './../services/departmentservice';
import { ItemService } from './../services/itemservice';
import { ListService } from './../services/listservice';
import { List } from './../classes/list';
import { Item } from './../classes/item';


ItemService.initialize();
ListService.initialize();
DepartmentService.initialize();

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

    let items = [
      { name: 'Foo', department: 1 }, 
      { name: 'Bar',department: 1 },
      { name: 'FooBar',department: 2 },
      { name: 'BarFoo', department: 3 }
    ];

    items.forEach(itemdata => {
      let item = new Item(itemdata.name, false, DepartmentService.getByID(itemdata.department));
      ItemService.addItem(item);
      list.addItem(item);
    });

    let arranged = list.getItemsByDepartment();
    expect(arranged[1].length).toBe(2);
    expect(arranged[2].length).toBe(1);
    expect(arranged[3].length).toBe(1);
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
