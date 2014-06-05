
Chair.prototype = new Item();
Chair.prototype.constructor = Chair;

function Chair () {
    this.name = 'Chair';
    this.id = 'KSHc1TZ7KrehQq';
    this.descriptionId = 'cs1sDBxaFx';

    this.fetchDescription();
}

items.availableItems.push(new Chair());