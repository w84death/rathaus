
Apple.prototype = new Item();
Apple.prototype.constructor = Apple;

function Apple () {
    this.name = 'Apple';
    this.id = 'JmNyjHfXBFgtx1';

    this.fetchDescription();
}

availableItems.push(new Apple());