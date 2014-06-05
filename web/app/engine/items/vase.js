
Vase.prototype = new Item();
Vase.prototype.constructor = Vase;

function Vase () {
    this.name = 'Vase';
    this.id = 'SsgfkhHTmqX0e4';
    this.descriptionId = "cs1tTG4FVF";

    this.fetchDescription();
}

items.availableItems.push(new Vase());