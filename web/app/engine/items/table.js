
Table.prototype = new Item();
Table.prototype.constructor = Table;

function Table () {
    this.name = 'Table';
    this.id = 'Qjp9JFb1wVA8qf';

    this.fetchDescription();
}

availableItems.push(new Table());