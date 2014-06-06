
Shoes.prototype = new Item();
Shoes.prototype.constructor = Shoes;

function Shoes () {
    this.name = 'Shoes';
    this.id = '67AQhgtwYeKYpW';
    this.descriptionId = 'cs1tDaDynH';

    this.fetchDescription();
}

items.availableItems.push(new Shoes());