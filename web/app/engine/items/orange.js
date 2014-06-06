
Orange.prototype = new Item();
Orange.prototype.constructor = Orange;

function Orange () {
    this.name = 'Orange';
    this.id = 'NYHxFKCVDBmpdH';
    this.descriptionId = 'cqAFc5MeK7';

    this.fetchDescription();
}

items.availableItems.push(new Orange());