
Notebook.prototype = new Item();
Notebook.prototype.constructor = Notebook;

function Notebook () {
    this.name = 'Notebook';
    this.id = '6hNc4YPmwkWwt';
    this.descriptionId = 'cs1svM3Hgf';

    this.fetchDescription();
}

items.availableItems.push(new Notebook());