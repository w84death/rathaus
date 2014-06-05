
Cheese.prototype = new Item();
Cheese.prototype.constructor = Cheese;

function Cheese () {
    this.name = 'Cheese';
    this.id = 'JzEmtEgA2cPh5k';

    this.fetchDescription();
}

items.availableItems.push(new Cheese());