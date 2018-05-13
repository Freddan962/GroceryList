import { Item } from './../classes/item';

describe('Test item creation', () => {
  test('Should be able to create a item with correct attributes', (done) => {
    let item = new Item('Cucumber');
    expect(item.getName()).toBe('Cucumber');  
    expect(item.bought).toBe(false);
      
    let item2 = new Item('Cucumberr', true);
    expect(item2.getName()).toBe('Cucumberr');
    expect(item2.bought).toBe(true);
    done();
  });

  test('Should have the correct creation IDs', (done) => {
    let initialID = Item.entries;
    let item = new Item('Grass');
    expect(item.getName()).toBe('Grass');
    expect(item.getID()).toBe(initialID+1);
    done();
  })
});