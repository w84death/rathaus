
Vase.prototype = new Item();
Vase.prototype.constructor = Vase;

function Vase () {
    this.name = 'Vase';
    this.id = 'SsgfkhHTmqX0e4';

    this.fetchDescription();
}

items.availableItems.push(new Vase());