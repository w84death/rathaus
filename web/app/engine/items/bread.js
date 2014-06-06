
Bread.prototype = new Item();
Bread.prototype.constructor = Bread;

function Bread () {
    this.name = 'Bread';
    this.id = 'DpVHNJVZbHfcN5';
    this.descriptionId = 'cqARK0zzTH';

    this.fetchDescription();
}

items.availableItems.push(new Bread());