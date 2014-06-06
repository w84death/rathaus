
Plate.prototype = new Item();
Plate.prototype.constructor = Plate;

function Plate () {
    this.name = 'Plate';
    this.id = 'WE0DCcMAjSvVk9';
    this.descriptionId = 'cqAREPxCPa';

    this.fetchDescription();
}

items.availableItems.push(new Plate());