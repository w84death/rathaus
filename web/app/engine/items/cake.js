
Cake.prototype = new Item();
Cake.prototype.constructor = Cake;

function Cake () {
    this.name = 'Cake';
    this.id = 'dgn7yP6XkkEtqf';
    this.descriptionId = 'cs1sBe3jv1';

    this.fetchDescription();
}

items.availableItems.push(new Cake());