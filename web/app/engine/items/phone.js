
Phone.prototype = new Item();
Phone.prototype.constructor = Phone;

function Phone () {
    this.name = 'Phone';
    this.id = 'AWFdC6wQ3Y8PrR';
    this.descriptionId = 'cs1t03YgH2';

    this.fetchDescription();
}

items.availableItems.push(new Phone());