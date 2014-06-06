
Spoon.prototype = new Item();
Spoon.prototype.constructor = Spoon;

function Spoon () {
    this.name = 'Spoon';
    this.id = 'Jr7mZmH1vj2EwF';
    this.descriptionId = 'cs1tGnZ1f4';

    this.fetchDescription();
}

items.availableItems.push(new Spoon());