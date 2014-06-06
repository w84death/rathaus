
Key.prototype = new Item();
Key.prototype.constructor = Key;

function Key () {
    this.name = 'Key';
    this.id = '1FPyJvn0JKRn6d';
    this.descriptionId = 'cs1sj4zx83';

    this.fetchDescription();
}

items.availableItems.push(new Key());