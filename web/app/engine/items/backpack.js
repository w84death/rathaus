
Backpack.prototype = new Item();
Backpack.prototype.constructor = Backpack;

function Backpack () {
    this.name = 'Backpack';
    this.id = '8MACcddCjDzhNV';
    this.descriptionId = 'cqAFdsW455';

    this.fetchDescription();
}

items.availableItems.push(new Backpack());