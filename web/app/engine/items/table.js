
Table.prototype = new Item();
Table.prototype.constructor = Table;

function Table () {
    this.name = 'Table';
    this.id = 'Qjp9JFb1wVA8qf';
    this.descriptionId = "cqARGnZ51Y";

    this.fetchDescription();
}

items.availableItems.push(new Table());