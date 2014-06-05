
Flower.prototype = new Item();
Flower.prototype.constructor = Flower;

function Flower () {
    this.name = 'Flower';
    this.id = 'd4StvPsCkQpXyh';

    this.fetchDescription();
}

availableItems.push(new Flower());