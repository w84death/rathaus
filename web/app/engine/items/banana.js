
Banana.prototype = new Item();
Banana.prototype.constructor = Banana;

function Banana () {
    this.name = 'Banana';
    this.id = 'QWf9EvwMS5dDxN';
    this.descriptionId = 'cqAEym3Y1a';

    this.fetchDescription();
}

items.availableItems.push(new Banana());