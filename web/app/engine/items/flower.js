
Flower.prototype = new Item();
Flower.prototype.constructor = Flower;

function Flower () {
    this.name = 'Flower';
    this.id = 'd4StvPsCkQpXyh';

    this.fetchDescription();
}

items.availableItems.push(new Flower());