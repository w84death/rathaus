
Flower.prototype = new Item();
Flower.prototype.constructor = Flower;

function Flower () {
    this.name = 'Flower';
    this.id = 'd4StvPsCkQpXyh';
    this.descriptionId = "cqARNAGBMB";

    this.fetchDescription();
}

items.availableItems.push(new Flower());