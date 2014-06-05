
Pear.prototype = new Item();
Pear.prototype.constructor = Pear;

function Pear () {
    this.name = 'Pear';
    this.id = 'X65yzqscweCsMt';

    this.fetchDescription();
}

availableItems.push(new Pear());