
Cheese.prototype = new Item();
Cheese.prototype.constructor = Cheese;

function Cheese () {
    this.name = 'Cheese';
    this.id = 'JzEmtEgA2cPh5k';
    this.descriptionId = 'cs1sDbDSp7';

    this.fetchDescription();
}

items.availableItems.push(new Cheese());