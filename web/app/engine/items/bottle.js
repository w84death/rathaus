
Bottle.prototype = new Item();
Bottle.prototype.constructor = Bottle;

function Bottle () {
    this.name = 'Bottle';
    this.id = 'RtXtnG5TEaZVnX';

    this.fetchDescription();
}

items.availableItems.push(new Bottle());