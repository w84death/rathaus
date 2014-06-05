
Apple.prototype = new Item();
Apple.prototype.constructor = Apple;

function Apple () {
    this.name = 'Apple';

    this.fetchDescription();
}