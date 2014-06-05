
Vase.prototype = new Item();
Vase.prototype.constructor = Vase;

function Vase () {
    this.name = 'Vase';
    this.id = 'SsgfkhHTmqX0e4';

    this.fetchDescription();
}

availableItems.push(new Vase());