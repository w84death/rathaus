
Apple.prototype = new Item();
Apple.prototype.constructor = Apple;

function Apple () {
    this.name = 'Apple';
    this.id = 'JmNyjHfXBFgtx1';
    this.descriptionId = 'cqARJJVZV6';

    this.fetchDescription();
}

items.availableItems.push(new Apple());