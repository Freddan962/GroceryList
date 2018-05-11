import { ListService } from './../services/listservice';
import { List } from './../classes/list';
import { Item } from './../classes/item';

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
    list.addItem(new Item('Chicken breast'));
    list.addItem(new Item('Rice'));
    list.addItem(new Item('Peanut butter'));
    expect(list.getItems()[2].getName()).toBe('Peanut butter');
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
