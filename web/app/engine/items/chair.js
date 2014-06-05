
Chair.prototype = new Item();
Chair.prototype.constructor = Chair;

function Chair () {
    this.name = 'Chair';
    this.id = 'KSHc1TZ7KrehQq';

    this.fetchDescription();
}

availableItems.push(new Chair());