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

  test('Should store unique items in the static container', (done) => {
    let initialCount = Item.Items.length;
    let item = new Item('Chicken');
    expect(Item.Items.length).toBe(initialCount+1);

    item = new Item('Chicken');
    expect(Item.Items.length).toBe(initialCount+1);
    done();
  });
});